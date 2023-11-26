import { View, Text, Dimensions } from 'react-native'
import React, { useState } from 'react'
//import { ChartDot, ChartPath, ChartPathProvider, ChartXLabel,ChartYLabel, monotoneCubicInterpolation } from '@rainbow-me/animated-charts';
import{LineChart, Decorator} from "react-native-chart-kit";

import { SIZES, COLORS } from '../constants';
import moment from 'moment/moment';

const Chart = ({ containerStyle, chartPrices }) => {

  const [clickedValue, setClickedValue] = useState("")

  let startUnixTimestamp = moment().subtract(7, 'day').unix();

  let data = Array.isArray(chartPrices)
    ? chartPrices.map((item, index) => ({
        x: startUnixTimestamp + (index + 1) * 3600,
        y: parseFloat(item), // Ensure that 'item' is a number
      }))
    : [];

  console.log(data);

  const onDataPointClick = ({ value, dataset, getColor }) => {
    // You can add custom logic based on the clicked data point
    console.log(`Clicked data point - Value: ${value}, Dataset: ${dataset}`);
    const color = getColor();
    console.log(`Color of the clicked point: ${color}`);
  
    // Update state to trigger re-render
    setClickedValue(value);
  };

  {/**const CustomDecorator = ({ x, y, data }) => {
    return (
      <View style={{ position: 'absolute', left: x, top: y - 20, alignItems: 'center' }}>
        <View style={{ backgroundColor: COLORS.white, padding: 5, borderRadius: 5 }}>
          <Text style={{ color: COLORS.black }}>{data}</Text>
        </View>
      </View>
    );
  };*/}
  


  return (
    <View style={{ ...containerStyle }}>
      {data && data.length > 0 && chartPrices && (
        <LineChart
          data={{
            labels: data.map(point => point.x), // Extracting x values from your data array
            datasets: [
              {
                data: data.map(point => point.y) // Extracting y values from your data array
              }
            ]
          }}
          //width={SIZES.width}
          width={Dimensions.get("window").width} // from react-native
          height={200}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1}
          withInnerLines={false}
          withOuterLines={false}
          withShadow={false}
          onDataPointClick={onDataPointClick}
          chartConfig={{
            backgroundColor: COLORS.black,
            backgroundGradientFrom: COLORS.black,
            backgroundGradientTo: COLORS.black,
            decimalPlaces: 2,
            color: () => COLORS.lightGreen,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '0',
              strokeWidth: '-50',
              stroke: '#ffa726',
            },
            xAxis: {
              style: {
             // color: 'white', // Text color for x-axis labels
              backgroundColor: COLORS.black, // Background color for x-axis labels
          },
        },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          //decorator={() => <Decorator onPress={onDataPointClick} render={CustomDecorator} />}
        />
      )}

      <View style={{backgroundColor: COLORS.black, width: "100%", height: 20, marginTop: -28}}></View>
      
      {clickedValue && (
            <View style={{ position: 'absolute', top: 50, left: 10 }}>
              <Text style={{ color: COLORS.white }}>{clickedValue}</Text>
            </View>
          )}
    </View>
  );
};

export default Chart;