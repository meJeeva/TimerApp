import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TimerScreen from '../screens/TimerScreen'
import TimerListScreen from '../screens/TimerListScreen'
import TimerHistoryScreen from '../screens/TimerHistoryScreen'

const Stack = createNativeStackNavigator()

const StackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='TimerScreen'
                component={TimerScreen}
                options={{
                }}
            />
            <Stack.Screen
                name='TimerListScreen'
                component={TimerListScreen}
                options={{
                }}
            />
            <Stack.Screen name="TimerHistory" component={TimerHistoryScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigation

const styles = StyleSheet.create({})