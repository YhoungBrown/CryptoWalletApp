import { View, Text } from 'react-native'
import React from 'react'
import { SIZES, COLORS, } from '../constants';

const HeaderBar = ({title}) => {
  return (
    <View style={{
        height: 100,
        paddingHorizontal: SIZES.radius,
        justifyContent: 'flex-end',
    }}>
      <Text style={{
        color: COLORS.white, 
        fontWeight: '600',
        fontSize: 30,}}>{title}</Text>
    </View>
  )
}

export default HeaderBar