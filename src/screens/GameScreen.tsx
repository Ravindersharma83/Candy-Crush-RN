import { Alert, Animated, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState, useRef } from 'react'
import { commonStyles } from '../styles/commonStyles';
import GameHeader from '../components/game/GameHeader';
import { useRoute } from '@react-navigation/native';
import { useSound } from '../navigation/SoundContext';
import GameFooter from '../components/game/GameFooter';
import GameTile from '../components/game/GameTile';
import { useLevelStore } from '../state/useLevelStore';
import { goBack } from '../utils/NavigationUtil';
import { screenWidth } from '../utils/Constants';
import LottieView from 'lottie-react-native';

const GameScreen:FC = () => {
  const route = useRoute();
  const item = route?.params as any;
  const playSound = useSound();
  const [gridData, setGridData] = useState<any>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [time, setTimer] = useState<any>(null);
  const [collectedCandies, setCollectedCandies] = useState<number>(0);

  const [showAnimation, setShowAnimation] = useState(false);
  const [firstAnimation, setFirstAnimation] = useState(false);

  const { completeLevel, unlockLevel } = useLevelStore();

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(()=>{
    if (item?.level) {
      setGridData(item?.level?.grid);
      setTotalCount(item?.level?.pass);
      setTimer(item?.level?.time);
    }
  },[])

  useEffect(()=> {
    if(time === 0) {
      handleGameOver();
    }
  }, [time]);

  const handleGameOver = () => {
    if (collectedCandies >= totalCount) {
      completeLevel(item?.level?.id, collectedCandies);
      unlockLevel(item?.level?.id + 1);
      Alert.alert("Congratulations!", "Level Completed!", [
        {
          text: "Next Level",
          onPress: ()=> goBack()
        }
      ]);
    } else {
      Alert.alert("Game Over", "You did not collect enough candies.", [
        {
          text: "Phew! I'll win next time",
          onPress: ()=> goBack()
        }
      ]);
    }
  }

  useEffect(() => {
    // console.log('time---', time);
  
    if (time && time > 0) {
      const timeoutId = setTimeout(() => {
        let timeInterval = setInterval(() => {
          setTimer((prev: number) => {
            if (prev <= 1000) {
              clearInterval(timeInterval);
              return 0;
            }
            return prev - 1000;
          });
        }, 1000);
  
        return () => clearInterval(timeInterval);
      }, 500);
  
      return () => clearTimeout(timeoutId);
    }
  }, [gridData]);
  

  useEffect(()=> {
    if (collectedCandies >= totalCount && totalCount > 0 && !firstAnimation) {
      setShowAnimation(true);
      startHeartBeatAnimation();
    }

    // console.log('totalCount---', totalCount);
    // console.log('collected---',collectedCandies);
    
    
  },[collectedCandies, totalCount]);

  const startHeartBeatAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true
          }),
        ]),

        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0.8,
            duration: 800,
            useNativeDriver: true
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true
          }),
        ]),

      ]),{
        iterations: 2
      }
    ).start(()=>{
      setFirstAnimation(true);
      setShowAnimation(false);
    });
  }

  return (
    <ImageBackground style={commonStyles.simpleContainer} source={require('../assets/images/b1.png')}>
      <GameHeader totalCount={totalCount} collectedCandies={collectedCandies} time={time} />

      {
        gridData ? (
          <GameTile
            data={gridData}
            setData={setGridData}
            setCollectedCandies={setCollectedCandies}
          />
        ) : (
          <Text>Loading...</Text>
        )
      }

      {
        showAnimation && (
          <>
            <Animated.Image
              source={require('../assets/text/t2.png')}
              style={[
                styles.centerImage,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            />

            <LottieView
                source={require('../assets/animations/confetti_2.json')}
                loop
                autoPlay
                style={styles.lottie}
            />

          </>
        )
      }
      <GameFooter/>
    </ImageBackground>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  centerImage: {
    position:'absolute',
    width: screenWidth * 0.8,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: '15%'
  },
  lottie: {
    position: 'absolute',
    width: screenWidth * 0.8,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: '10%'

  }
})