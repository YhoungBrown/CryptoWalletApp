import { View, Text, Image } from 'react-native'
import React from 'react'
import { SIZES, COLORS,icons } from '../constants'

const BalanceInfo = ({title,displayAmount,changePct, containerStyle}) => {
  return (
    <View style={{...containerStyle}}>
         {/**Title */}
      <Text style={{
        color: COLORS.lightGray3,
        fontWeight: '400'
      }}>{title}</Text>

        {/**Figure */}
      <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end'
      }}>
            <Text style={{fontWeight: '400', color: COLORS.lightGray3}}>$</Text>
            <Text style={{marginLeft: SIZES.base, fontWeight: '500', fontSize: 25, color: COLORS.white}}>{displayAmount.toLocaleString()}</Text>
            <Text style={{ marginLeft: SIZES.base/2,
                color: COLORS.lightGray3, fontWeight: '400', fontSize:12 
            }}>USD</Text>
      </View>

        {/**Change Percentage */}
        <View style={{
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
        </View>
    </View>
  )
}

export default BalanceInfo