import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import {DIM, FONTS} from '../utils/constant';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';

const TimerListScreen = () => {
  const [timers, setTimers] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [timerStates, setTimerStates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [completedTimerName, setCompletedTimerName] = useState('');

  useEffect(() => {
    loadTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadTimers = async () => {
    try {
      const savedTimers = await AsyncStorage.getItem('timers');
      if (savedTimers) {
        const parsedTimers = JSON.parse(savedTimers);
        setTimers(parsedTimers);

        const initialTimerStates = {};
        parsedTimers.forEach(timer => {
          initialTimerStates[timer.id] = {
            remainingTime: timer.duration,
            status: 'Paused',
          };
        });
        setTimerStates(initialTimerStates);
      }
    } catch (error) {
      console.error('Error loading timers:', error);
    }
  };

  const updateTimers = () => {
    setTimerStates(prev => {
      const updatedTimers = {...prev};

      Object.keys(updatedTimers).forEach(async id => {
        if (
          updatedTimers[id].status === 'Running' &&
          updatedTimers[id].remainingTime > 0
        ) {
          updatedTimers[id].remainingTime -= 1;
        }

        if (
          updatedTimers[id].remainingTime === 0 &&
          updatedTimers[id].status !== 'Completed'
        ) {
          updatedTimers[id].status = 'Completed';

          const completedTimer = timers.find(t => t.id === id);
          if (completedTimer) {
            setCompletedTimerName(completedTimer.name);
            setModalVisible(true);

            const historyEntry = {
              id,
              name: completedTimer.name,
              completedAt: new Date().toLocaleString(),
            };
            await saveToHistory(historyEntry);
          }
        }
      });

      return updatedTimers;
    });
  };

  const saveToHistory = async entry => {
    try {
      const existingHistory = await AsyncStorage.getItem('timerHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      history.push(entry);
      await AsyncStorage.setItem('timerHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  const toggleTimer = id => {
    setTimerStates(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        status: prev[id].status === 'Running' ? 'Paused' : 'Running',
      },
    }));
  };

  const resetTimer = id => {
    setTimerStates(prev => ({
      ...prev,
      [id]: {
        remainingTime: timers.find(t => t.id === id).duration,
        status: 'Paused',
      },
    }));
  };

  const toggleCategory = category => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const startAllTimers = category => {
    setTimerStates(prev => {
      const updated = {...prev};
      timers
        .filter(t => t.category === category)
        .forEach(timer => {
          updated[timer.id].status = 'Running';
        });
      return updated;
    });
  };

  const pauseAllTimers = category => {
    setTimerStates(prev => {
      const updated = {...prev};
      timers
        .filter(t => t.category === category)
        .forEach(timer => {
          updated[timer.id].status = 'Paused';
        });
      return updated;
    });
  };

  const resetAllTimers = category => {
    setTimerStates(prev => {
      const updated = {...prev};
      timers
        .filter(t => t.category === category)
        .forEach(timer => {
          updated[timer.id] = {
            remainingTime: timer.duration,
            status: 'Paused',
          };
        });
      return updated;
    });
  };

  const groupedTimers = timers.reduce((groups, timer) => {
    if (!groups[timer.category]) {
      groups[timer.category] = [];
    }
    groups[timer.category].push(timer);
    return groups;
  }, {});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timers</Text>
      <FlatList
        data={Object.keys(groupedTimers)}
        keyExtractor={category => category}
        renderItem={({item: category}) => (
          <View>
            <TouchableOpacity
              style={styles.categoryHeader}
              onPress={() => toggleCategory(category)}>
              <Text
                style={[
                  styles.categoryText,
                  {
                    fontFamily: FONTS.medium,
                  },
                ]}>
                {category}
              </Text>
              <Text>{expandedCategories[category] ? '▼' : '▶'}</Text>
            </TouchableOpacity>

            {expandedCategories[category] && (
              <View>
                <View style={styles.bulkActions}>
                  <TouchableOpacity
                    style={styles.bulkButton}
                    onPress={() => startAllTimers(category)}>
                    <Text
                      style={[
                        styles.bulkButtonText,
                        {
                          fontFamily: FONTS.bold,
                        },
                      ]}>
                      Start All
                    </Text>
                    <Entypo name="controller-play" size={20} color={'white'} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.bulkButton}
                    onPress={() => pauseAllTimers(category)}>
                    <Text
                      style={[
                        styles.bulkButtonText,
                        {
                          fontFamily: FONTS.bold,
                        },
                      ]}>
                      Pause All
                    </Text>
                    <Foundation name="pause" size={20} color={'white'} /> 
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.bulkButton}
                    onPress={() => resetAllTimers(category)}>
                    <Text
                      style={[
                        styles.bulkButtonText,
                        {
                          fontFamily: FONTS.bold,
                        },
                      ]}>
                      Reset All
                    </Text>
                    <MaterialCommunityIcons name="restart" size={20} color={'white'} />
                  </TouchableOpacity>
                </View>

                {groupedTimers[category].map(timer => (
                  <View key={timer.id} style={styles.timerItem}>
                    <Text
                      style={{
                        fontFamily: FONTS.bold,
                        fontSize: 20,
                      }}>
                      {timer.name}
                    </Text>
                    <Progress.Bar
                      progress={
                        timerStates[timer.id]?.remainingTime / timer.duration
                      }
                      width={200}
                    />
                    <Text>
                      {Math.round(
                        (timerStates[timer.id]?.remainingTime /
                          timer.duration) *
                          100,
                      )}
                      % remaining
                    </Text>
                   <View style={{
                    flexDirection:'row',
                    alignItems:"center",
                    justifyContent:'space-between',
                    marginTop:DIM.deviceHeight*0.02
                   }}>
                   <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}
                      onPress={() => toggleTimer(timer.id)}>
                      <Text style={styles.buttonText}>
                        {timerStates[timer.id]?.status === 'Running'
                          ? 'Pause'
                          : 'Start'}
                      </Text>
                      {
                        timerStates[timer.id]?.status !== 'Running' ? 
                        
                        <Entypo name="controller-play" size={20} /> :
                        <Foundation name="pause" size={20} /> 
                    }
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}
                      onPress={() => resetTimer(timer.id)}>
                      <Text style={styles.buttonText}>Reset</Text>
                      <MaterialCommunityIcons name="restart" size={20} />
                    </TouchableOpacity>
                   </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      />

      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContent}>
          <Text>🎉 Timer Completed: {completedTimerName} 🎉</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButton}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: 'white'},
  title: {fontSize: 22, fontFamily: FONTS.bold, marginBottom: 10},
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#ddd',
    marginVertical: 5,
    borderRadius: 8,
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  bulkButton: {backgroundColor: '#007bff', padding: 8, borderRadius: 5,
flexDirection:'row',
alignItems:'center',
gap:10},
  bulkButtonText: {color: '#fff'},
  timerItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default TimerListScreen;
