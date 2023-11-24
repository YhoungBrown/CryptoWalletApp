import { View, Text } from 'react-native'
import React from 'react'
//import { ChartDot, ChartPath, ChartPathProvider, ChartXLabel,ChartYLabel, monotoneCubicInterpolation } from '@rainbow-me/animated-charts';

import { SIZES, COLORS } from '../constants';

const Chart = ({constainerStyle, chartPrices}) => {
  return (
    <View>
      <Text style={{color: COLORS.white, alignItems: 'center', justifyContent: 'center'}}>Chart</Text>
    </View>
  )
}

export default Chart