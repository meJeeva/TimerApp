import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'

const Stack = createNativeStackNavigator()

const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name='LoginScreen'
                component={LoginScreen}
            />
            <Stack.Screen
                name='SplashScreen'
                component={SplashScreen}
                options={{
                }}
            />
            <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
            />
        </Stack.Navigator>
    )
}

export default StackNavigation

const styles = StyleSheet.create({})