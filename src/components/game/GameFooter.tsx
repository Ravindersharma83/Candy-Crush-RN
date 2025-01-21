import { StyleSheet, Text, View, Image } from 'react-native'
import React, { FC } from 'react'
import ScalePress from '../ui/ScalePress'
import { screenHeight } from '../../utils/Constants'
import { goBack } from '../../utils/NavigationUtil'

const GameFooter:FC = () => {
  return (
    <View style={styles.flex1}>
        <ScalePress onPress={() => goBack()}>
            <Image source={require('../../assets/icons/close.png')} style={styles.closeIcon}/>
        </ScalePress>
    </View>
  )
}

export default GameFooter

const styles = StyleSheet.create({
    flex1: {
        height: screenHeight * 0.1,
        width: '100%',
        paddingHorizontal: 10
    },
    closeIcon: {
        width: 45,
        height: 45,
        resizeMode: 'contain'
    }
})