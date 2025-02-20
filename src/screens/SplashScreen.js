import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { DIM, FONTS, IMAGES } from '../utils/constant'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get("window");

const SplashScreen = () => {

    const translateY = useSharedValue(height / 2);
    const navigation = useNavigation()

    useEffect(() => {
      translateY.value = withTiming(0, {
        duration: 1000,
        easing: Easing.out(Easing.ease),
      });

      setTimeout(() => {
        navigation.replace('TimerScreen')
      }, 3000);
    }, []);
  
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

  return (
    <View style={{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        padding:30
    }}>
        <Image 
            source={IMAGES.splashImg}
            style={{
                height:DIM.deviceHeight*0.4,
                width:DIM.deviceHeight*0.4,
            }}
        />
        <Text style={{
            fontFamily:FONTS.bold,
            fontSize:30
        }}>Timer</Text>
        <Text style={{
             fontFamily:FONTS.medium,
             fontSize:15,
             textAlign:'center',
             marginTop:10
        }}>
        "Time is Precious. Make Every Second Count!"
      </Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
      },
})