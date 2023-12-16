import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import Animated, { FadeIn, Layout } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { COLORS, SIZES } from '../constants'
import { selectMyHoldings } from '../stores/market/marketSlice'

const IconTextButton = ({label, icon, containerStyle, onPress}) => {

  const  myHoldings = useSelector(selectMyHoldings);

  const showShadow = myHoldings.length === 0 || !myHoldings

  const skeletonCommonProps = {
    colorMode: 'light' ,
    backgroundColor:'#D4D4D4',
    transition:{
        type: 'timing',
        duration: 2000,
    }
}

  return (
    <Skeleton
      show={showShadow}
        height={40} 
        width={155}
        style={{marginRight: 25}} 
        //radius= {'round'}
        {...skeletonCommonProps}
    >
    <TouchableOpacity style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...containerStyle
    }}
    onPress={onPress}>
  <Animated.View style={{
    flexDirection: 'row'
  }}
    layout={Layout} 
    entering={FadeIn.duration(1500)}
    >
      <Image
      source={icon} 
      resizeMode='contain'
        style={{
            width: 20,
            height: 20,
        }}
      />
      <Text
        style={{
            marginLeft: SIZES.base,
            fontWeight:'300'
        }}
      >
            {label}
      </Text>

    </Animated.View>
    </TouchableOpacity>
    </Skeleton>
  )
}

export default IconTextButton