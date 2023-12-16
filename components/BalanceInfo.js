import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { Image, Text, View } from 'react-native'
import Animated, { FadeIn, Layout } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { COLORS, SIZES, icons } from '../constants'
import { selectMyHoldings } from '../stores/market/marketSlice'



const BalanceInfo = ({title,displayAmount,changePct, containerStyle}) => {
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
    <View style={{...containerStyle}}>
         {/**Title */}
      <Skeleton
      show={showShadow}
        height={15} 
        width={80} 
        //radius= {'round'}
        {...skeletonCommonProps}
      >
        <Animated.Text 
        layout={Layout} 
        entering={FadeIn.duration(1500)}
        style={{
          color: COLORS.lightGray3,
          fontWeight: '400'
        }}
        >
        {title}
      </Animated.Text>
      </Skeleton>
      

        {/**Figure */}
    <Skeleton.Group>
      <Skeleton
      show={showShadow}
        height={32} 
        width={230} 
        //radius= {'round'}
        {...skeletonCommonProps}
      >
      <Animated.View
      layout={Layout} 
      entering={FadeIn.duration(1500)}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end'
      }}>
            <Text style={{fontWeight: '400', color: COLORS.lightGray3}}>$</Text>
            <Text style={{marginLeft: SIZES.base, fontWeight: '500', fontSize: 25, color: COLORS.white}}>{displayAmount.toLocaleString()}</Text>
            <Text style={{ marginLeft: SIZES.base/2,
                color: COLORS.lightGray3, fontWeight: '400', fontSize:12 
            }}>USD</Text>
      </Animated.View>
      </Skeleton>

        {/**Change Percentage */}
        <Skeleton
        show={showShadow}
        height={20} 
        width={130} 
        //radius= {'round'}
        {...skeletonCommonProps}
      >

        <Animated.View 
        layout={Layout} 
        entering={FadeIn.duration(1500)}
        style={{
            flexDirection: 'row',
            alignItems: 'flex-end'
        }}>
            {changePct !== 0 && <Image 
                source={icons.upArrow}
                resizeMode='contain'
                style={{
                    width: 10,
                    height: 10,
                    alignSelf: 'center',
                    tintColor: (changePct > 0) ? COLORS.lightGreen : COLORS.red,
                    transform: (changePct > 0) ? [{rotate: '45deg'}] : [{rotate: '125deg'}]
                }}
            />}

            <Text style={{
                marginLeft: SIZES.base,
                alignSelf: 'flex-end',
                color: (changePct === 0) ? COLORS.lightGray3 : (changePct > 0) ? COLORS.lightGreen : COLORS.red,
                fontWeight: '400'
            }}>
            {/**The below means the changepct should be finxed to 2 decimal places */}
                {changePct.toFixed(2)}%
            </Text>

            <Text
            style={{
                marginLeft: SIZES.radius,
                alignSelf: 'flex-end',
                color: COLORS.lightGray3,
                fontWeight: '600',
                fontSize: 10,
            }}>
                7d change
            </Text>
        </Animated.View>
      </Skeleton>
      </Skeleton.Group>
    </View>
  )
}

export default BalanceInfo