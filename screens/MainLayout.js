import { View, Text, Animated} from 'react-native'
import React, { useEffect, useRef } from 'react'
import {COLORS, SIZES, icons} from '../constants';
import { IconTextButton } from '../components'; 
import { selectTradeModalVisibility } from '../stores/tab/tabSlice';
import { useSelector } from 'react-redux';


const MainLayout = ({children}) => {
  const TradeModalVisibility = useSelector(selectTradeModalVisibility);

  const modalAnimatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (TradeModalVisibility){
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false, // This is often used for performance
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false, // This is often used for performance
      }).start();
    }
  }, [TradeModalVisibility])


  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 250]
  })

  return (
    <View 
    style={{
        flex: 1
    }}>
      {children}

      {/**Dim Background */}
        {TradeModalVisibility && 
        <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          backgroundColor: COLORS.transparentBlack
        }}
        opacity={modalAnimatedValue}/>}
        
      {/**Modal */}
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            padding: SIZES.padding,
            backgroundColor: COLORS.primary
          }}
        >
            <IconTextButton 
              label={"Transfer"}
              icon={icons.send}
              onPress={() => console.log("Transfer")}
            />
            <IconTextButton 
              label={"Withdraw"}
              icon={icons.withdraw}
              onPress={() => console.log("withdraw")}
              containerStyle={{marginTop: SIZES.base}}
            />
        </Animated.View>
    </View>
  )
}

export default MainLayout