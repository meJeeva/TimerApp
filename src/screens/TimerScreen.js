import React, {useState} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {CheckBox, Button, Divider} from '@rneui/themed';
import { DIM, FONTS } from '../utils/constant';

const TimerScreen = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [halfwayAlert, setHalfwayAlert] = useState(false);
  const navigation = useNavigation();

  const saveTimer = async () => {
    if (!name || !duration || !category) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration),
      category,
      halfwayAlert,
    };

    try {
      const existingTimers = await AsyncStorage.getItem('timers');
      const timers = existingTimers ? JSON.parse(existingTimers) : [];
      timers.push(newTimer);
      await AsyncStorage.setItem('timers', JSON.stringify(timers));
      setName('');
      setDuration('');
      setCategory('');
      setHalfwayAlert(false);
      Alert.alert('Success', 'Timer saved successfully');
    } catch (error) {
      console.error('Error saving timer:', error);
    }
  };

  return (
    <View style={{padding: 20, flex: 1, backgroundColor: 'white'}}>
      <Text style={{fontSize: 18, 
      fontFamily:FONTS.bold
    }}>Create New Timer</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
        placeholderTextColor={'grey'}
      />
      <TextInput
        placeholder="Duration (seconds)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        placeholderTextColor={'grey'}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
      fontFamily:FONTS.medium
        }}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        placeholderTextColor={'grey'}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
      fontFamily:FONTS.medium
        }}
      />

      <CheckBox
        title="Enable Halfway Alert"
        checked={halfwayAlert}
        onPress={() => setHalfwayAlert(!halfwayAlert)}
      />

      <Button
        title="Save Timer"
        buttonStyle={{
          backgroundColor: 'black',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 10,
        }}
        containerStyle={{
          width: 200,
          marginVertical: 10,
          marginHorizontal: 'auto',
        }}
        titleStyle={{
      fontFamily:FONTS.bold
        }}
        onPress={saveTimer}
      />

      <Divider style={{
        marginVertical:DIM.deviceHeight*0.02
      }} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent:"space-between"
        }}>
        <Button
          title="View Timers"
          buttonStyle={{
            backgroundColor: '#007bff',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 10,
            height:DIM.deviceHeight*0.1
          }}
          containerStyle={{
            marginVertical: 10,
            width:DIM.deviceWidth*0.42
          }}
          titleStyle={{
      fontFamily:FONTS.bold

          }}
          onPress={() => navigation.navigate('TimerListScreen')}
        />
        <Button
          title="history page"
          buttonStyle={{
            backgroundColor: '#007bff',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 10,
            height:DIM.deviceHeight*0.1

          }}
          containerStyle={{
            marginVertical: 10,
            width:DIM.deviceWidth*0.42
          }}
          titleStyle={{
      fontFamily:FONTS.bold
          }}
          onPress={() => navigation.navigate('TimerHistory')}
        />
      </View>
    </View>
  );
};

export default TimerScreen;
