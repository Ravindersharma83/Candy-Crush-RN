import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { commonStyles } from '../styles/commonStyles';
import GameHeader from '../components/game/GameHeader';
import { useRoute } from '@react-navigation/native';
import { useSound } from '../navigation/SoundContext';
import GameFooter from '../components/game/GameFooter';
import GameTile from '../components/game/GameTile';

const GameScreen:FC = () => {
  const route = useRoute();
  const item = route?.params as any;
  const playSound = useSound();
  const [gridData, setGridData] = useState<any>(0);

  const [totalCount, setTotalCount] = useState<number>(0);
  const [time, setTimer] = useState<any>(null);
  const [collectedCandies, setCollectedCandies] = useState<number>(0);

  useEffect(()=>{
    if (item?.level) {
      setGridData(item?.level?.grid);
      setTotalCount(item?.level?.pass);
      setTimer(item?.level?.time);
    }
  },[])

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
      <GameFooter/>
    </ImageBackground>
  )
}

export default GameScreen

const styles = StyleSheet.create({})