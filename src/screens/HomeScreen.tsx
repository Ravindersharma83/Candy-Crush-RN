import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { commonStyles } from '../styles/commonStyles';
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';
import { screenWidth } from '../utils/Constants';
import { useIsFocused } from '@react-navigation/native';
import { useSound } from '../navigation/SoundContext';
import LottieView from 'lottie-react-native';

const HomeScreen:FC = () => {
    // for playing sound on HomeScreen using useSound() context hook
    const {playSound} = useSound();

    const isFocused = useIsFocused(); // hook to identify which current screen is mount

    // Adding animation to the image
    const translateY = useSharedValue(-200);

    // useEffect(()=>{
    //     if(isFocused) {
    //         playSound('bg', true);
    //     }
    // },[isFocused]);

    useEffect(()=>{
        translateY.value = withTiming(0,{duration: 3000});
    },[isFocused]);

    const animatedStyle = useAnimatedStyle(()=>({
        transform: [{translateY: translateY.value}]
    }));


  return (
    <ImageBackground source={require('../assets/images/b2.png')} style={commonStyles.simpleContainer}>
        {/* For animated image */}
        <Animated.Image
            source={require('../assets/images/banner.png')}
            style={[styles.img, animatedStyle]}
        />

        {/* For animated image using lottieView */}
        <LottieView
            source={require('../assets/animations/bird.json')}
            speed={1}
            loop
            autoPlay
            hardwareAccelerationAndroid={true}
            style={styles.lottieView}
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
    },
    lottieView: {
        width: 200,
        height: 200,
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: [{scaleY: -1}]
    }
})