import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SIZES, COLORS, constants, icons} from '../constants';

const TextButton = ({label, containerStyle, onPress}) => {
  return (
    <TouchableOpacity
    style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 3,
        paddingHorizontal: 18,
        borderRadius:15,
        backgroundColor: COLORS.gray1,
        ...containerStyle
    }}>
      <Text style={{
        color: COLORS.white,
        fontWeight: '400',
      }}>{label}</Text>
    </TouchableOpacity>
  )
}

export default TextButton