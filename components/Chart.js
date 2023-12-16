import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart, } from "react-native-chart-kit";
import Animated, { FadeIn, Layout } from 'react-native-reanimated';

import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants';
import { selectCoins } from '../stores/market/marketSlice';





const formatNumber = (value, roundingPoint) => {
  let suffix = "";
  let modifiedValue = parseFloat(value); // Parse the string to a number

  if (!isNaN(modifiedValue)) {
    if (modifiedValue > 1e9) {
      modifiedValue /= 1e9;
      suffix = "B";
    } else if (modifiedValue > 1e6) {
      modifiedValue /= 1e6;
      suffix = "M";
    } else if (modifiedValue > 1e3) {
      modifiedValue /= 1e3;
      suffix = "K";
    }
  } else {
    // Handle the case when the value is not a valid number
    console.warn(`Invalid value: ${value}`);
    modifiedValue = 0; // Or handle it in a way that makes sense for your application
  }

  return `${parseFloat(modifiedValue.toFixed(roundingPoint))}`;
};






const Chart = ({ containerStyle, chartPrices }) => {
  const coins = useSelector(selectCoins);


  const showShadow = coins.length === 0 || !coins

  const skeletonCommonProps = {
    colorMode: 'light' ,
    backgroundColor:'#D4D4D4',
    transition:{
        type: 'timing',
        duration: 2000,
    }
}

 //const [clickedValue, setClickedValue] = useState("");
 // const [modalVisible, setModalVisible] = useState(false);

  let startUnixTimestamp = moment().subtract(7, 'day').unix();

  let data = Array.isArray(chartPrices)
    ? chartPrices.map((item, index) => ({
        x: startUnixTimestamp + (index + 1) * 3600,
        y: parseFloat(item), // Ensure that 'item' is a number
      }))
    : [];

    data = data.map(point => ({
      ...point,
      y: formatNumber(point.y, 2),
    }));

  console.log(data);

  {/**const onDataPointClick = ({ value, dataset, getColor }) => {
    // You can add custom logic based on the clicked data point
    console.log(`Clicked data point - Value: ${value}, Dataset: ${dataset}`);
    const color = getColor();
    console.log(`Color of the clicked point: ${color}`);
  
    // Update state to trigger re-render
    setClickedValue(value);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };*/}
  
  
  
  


  return (
    <View style={{marginTop: 12}}>
    <Skeleton
      show={showShadow}
        height={185} 
        width={400} 
        //radius= {'round'}
        {...skeletonCommonProps}
        
      >

    <Animated.View 
    layout={Layout} 
    entering={FadeIn.duration(1500)}
    style={{ ...containerStyle }}>
    {!chartPrices ? (<View style={{marginTop: 30}}></View>) : null}
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
          yAxisSuffix="K"
          yAxisInterval={1}
          withInnerLines={false}
          withOuterLines={false}
          withShadow={false}
          //onDataPointClick={onDataPointClick(value)}
          chartConfig={{
            backgroundColor: COLORS.black,
            backgroundGradientFrom: COLORS.black,
            backgroundGradientTo: COLORS.black,
            decimalPlaces: 2,
            color: () => COLORS.lightGreen,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
              marginRight: 5,
              zIndex: 50,
            },
            propsForDots: {
              r: '0',
              strokeWidth: '-50',
              stroke: '#ffa726',
            },
            xAxis: {
              style: {
              backgroundColor: COLORS.black, 
              },
            },
            //formatYLabel: value => formatNumber(value, 2)
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}

      <View style={{backgroundColor: COLORS.black, width: "100%", height: 20, marginTop: -28}}></View>
      
      

    </Animated.View>
  </Skeleton>
  </View>
  );
};



export default Chart;