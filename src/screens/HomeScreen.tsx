import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { commonStyles } from '../styles/commonStyles'
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated'
import { screenWidth } from '../utils/Constants'
import { useIsFocused } from '@react-navigation/native'

const HomeScreen:FC = () => {
    const isFocused = useIsFocused(); // hook to identify which current screen is mount

    // Adding animation ti the image
    const translateY = useSharedValue(-200);

    useEffect(()=>{
        translateY.value = withTiming(0,{duration: 3000});
    },[isFocused]);

    const animatedStyle = useAnimatedStyle(()=>({
        transform: [{translateY: translateY.value}]
    }));


  return (
    <ImageBackground source={require('../assets/images/b2.png')} style={commonStyles.simpleContainer}>
        <Animated.Image
            source={require('../assets/images/banner.png')}
            style={[styles.img, animatedStyle]}
        />
    </ImageBackground>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    img: {
        width: screenWidth,
        height: screenWidth * 0.8,
        position: 'absolute',
        resizeMode: 'contain',  // to display proper full image
        top: -20
    }
})