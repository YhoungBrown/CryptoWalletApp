import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants'

const SectionTitle = ({title}) => {
  return (
    <View style={{
        marginTop: SIZES.padding
    }}>
      <Text 
        style={{
            color: COLORS.lightGray3,
            fontWeight: '600'
        }}
      >
        {title}
      </Text>
    </View>
  )
}

export default SectionTitle