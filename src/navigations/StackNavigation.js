import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TimerScreen from '../screens/TimerScreen'
import TimerListScreen from '../screens/TimerListScreen'
import TimerHistoryScreen from '../screens/TimerHistoryScreen'
import { FONTS } from '../utils/constant'
import SplashScreen from '../screens/SplashScreen'

const Stack = createNativeStackNavigator()

const StackNavigation = () => {
    return (
        <Stack.Navigator>
           <Stack.Screen
                name='SplashScreen'
                component={SplashScreen}
                options={{
                  headerShown:false
                }}
            />
            <Stack.Screen
                name='TimerScreen'
                component={TimerScreen}
                options={{
                  headerTitleAlign:'center',
                  headerTitleStyle:{
                    fontFamily : FONTS.bold,
                    fontSize:17
                  },
                  title:'Timer'
                }}
            />
            <Stack.Screen
                name='TimerListScreen'
                component={TimerListScreen}
                options={{
                    headerTitleStyle:{
                      fontFamily : FONTS.bold,
                      fontSize:17
                    },
                    title:'Timer List'
                  }}
            />
            <Stack.Screen name="TimerHistory" component={TimerHistoryScreen}  options={{
                    headerTitleStyle:{
                      fontFamily : FONTS.bold,
                      fontSize:17
                    },
                    title:'Timer History'
                  }}/>
        </Stack.Navigator>
    )
}



export default StackNavigation

const styles = StyleSheet.create({})