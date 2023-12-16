import React from 'react'
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, SIZES, icons } from '../constants'

const Setting = ({title, value, type, onPress}) => {
    if (type === "button") {
        return (
            <TouchableOpacity 
                style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center',
                }}
                onPress={onPress}
            >
                <Text 
                style={{flex: 1,
                color: COLORS.white,
                fontWeight: "600"}}
                >
                        {title}
                </Text>

                <View 
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{
                        marginRight: SIZES.radius,
                        color: COLORS.lightGray3,
                        fontWeight: '400'
                        }}
                    >
                        {value}
                    </Text>

                    <Image 
                        source={icons.rightArrow}
                        style={{
                            height: 15,
                            width: 15,
                            tintColor: COLORS.white,
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    } else {
  return (
    <View style={{
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
    }}>
      <Text style={{
        flex: 1,
        color: COLORS.white,
        fontWeight: '600'
      }}>{title}</Text>

      <Switch 
        value={value}
        onValueChange={(value) => onPress(value)}
      />
    </View>
  )
}
}

export default Setting