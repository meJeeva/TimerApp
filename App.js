import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';
import { Text, ThemeProvider, createTheme } from '@rneui/themed';

const theme = createTheme({
  lightColors: {

  },
  darkColors: {

  },
})


const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App

const styles = StyleSheet.create({})