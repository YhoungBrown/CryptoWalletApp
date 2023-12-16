import { View, Text, TouchableOpacity, FlatList, Animated, Image} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import{LineChart,} from "react-native-chart-kit";


import MainLayout from './MainLayout'
import { SIZES, COLORS, constants, icons} from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getCoinMarketBegin, getCoinMarketFailure, getCoinMarketSuccess, selectCoins } from '../stores/market/marketSlice';
import axios from 'axios';
import HeaderBar from '../components/HeaderBar';
import TextButton from '../components/TextButton';
import { measure } from 'react-native-reanimated';





const Market = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const marketTabScrollViewRef = useRef();
  const dispatch = useDispatch();
  const coins = useSelector(selectCoins);

  const onMarketTabPress = useCallback(marketTabIndex => {
    marketTabScrollViewRef?.current?.scrollToOffset({
      offset: marketTabIndex * SIZES.width
    })
  })

  const marketTabs = constants.marketTabs.map((marketTab) => ({
    ...marketTab,
    ref: React.createRef(), // Create refs separately
}));


  const TabIndicator = ({measureLayout, scrollX}) => {

    const inputRange = marketTabs.map((_, i) => i * SIZES.width)

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: measureLayout.map((measure) => measure.x),
    })

    return(
      <Animated.View 
        style={{
          position: 'absolute',
          left:0,
          height: "100%",
          width: (SIZES.width - (SIZES.radius * 2)) / 2,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray,
          transform: [{
            translateX
          }]
        }}
      />
    
    )
  }

  const Tabs = ({ scrollX, onMarketTabPress }) => {
    const [measureLayout, setMeasureLayout] = useState([]);
    const containerRef = useRef();
  
    useEffect(() => {
      let ml = [];
  
      marketTabs.forEach((marketTab) => {
        marketTab?.ref?.current?.measureLayout(
          containerRef.current,
          (x, y, width, height) => {
            ml.push({
              x,
              y,
              width,
              height,
            });
  
            if (ml.length === marketTabs.length) {
              setMeasureLayout(ml);
            }
          }
        );
      });
    }, [containerRef.current]);
  
    useEffect(() => {
      // Log the measureLayout whenever it changes
      console.log("measureLayout:", measureLayout);
    }, [measureLayout]);
  
    return (
      <View ref={containerRef} style={{ flexDirection: "row" }}>
        {/**Tab Indicator */}
        {measureLayout.length > 0 && (
          <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
        )}
  
        {/**Tabs */}
        {marketTabs.map((item, index) => {
          return (
            <TouchableOpacity
              key={`marketTab-${index}`}
              style={{
                flex: 1,
              }}
              onPress={() => onMarketTabPress(index)}
            >
              <View
                ref={item.ref}
                style={{
                  paddingHorizontal: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 40,
                }}
              >
                <Text style={{ color: COLORS.white, fontWeight: "500" }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  


  const getCoinMarket = async (currency = 'usd', orderBy = 'market_cap_desc', sparkline = true, priceChangePerc = '7d', perPage = 10, page = 1) => {
    
    dispatch(getCoinMarketBegin())

    let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`
    //console.log(apiUrl)

    await axios ({
      url: apiUrl,
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }).then((res) => {
      //console.log(res.data)
      if(res.status === 200){
        dispatch(getCoinMarketSuccess(res.data))
      } else {
        dispatch(getCoinMarketFailure(res.data))
      }
    }).catch((error) => {
      //console.log("Alert2 :" + error)
      dispatch(getCoinMarketFailure("Alert: AxiosError:" + error.message))
    })
}


  useEffect(() => {
    //getCoinMarket()
  }, [])


  function renderTabBar() {
    return(
      <View style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray,
      }}>
        <Tabs 
          scrollX={scrollX}
          onMarketTabPress={onMarketTabPress}
        />
      </View>
    )
  }

  function renderButtons() {
    return(
      <View style={{
        flexDirection: 'row', 
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius,}}
      >
          <TextButton 
            label='USD'
          />
          <TextButton 
            label='% (7d)'
            containerStyle={{
              marginLeft: SIZES.base,
            }}
          />
          <TextButton 
            label='Top'
            containerStyle={{
              marginLeft: SIZES.base,
            }}
          />
      </View>
    )
  }

  function renderList() {
    return(
      <Animated.FlatList
        ref={marketTabScrollViewRef} 
        data={marketTabs}
        contentContainerStyle={{
          marginTop: SIZES.padding
        }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={
          Animated.event([
            {nativeEvent: {contentOffset: {x: scrollX} }}
          ], {useNativeDriver: false} )
        }
        renderItem={({item, index}) => {
          return(
            <View
            style={{
              flex: 1,
              width: SIZES.width,
            }}>
                <FlatList 
                  data={coins}
                  keyExtractor={item => item.id}
                  renderItem={({item, index}) => {
                    let priceColor = (item.price_change_percentage_7d_in_currency === 0) ? COLORS.lightGray3 : (item.price_change_percentage_7d_in_currency > 0) ? COLORS.lightGreen : COLORS.red
                    return(
                      <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        marginBottom: SIZES.radius,}}
                      >
                          {/**Coins section */}
                            <View style={{
                              flex: 1.5,
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                                <Image source={{uri: item.image}}
                                  style={{
                                    height: 20,
                                    width: 20,
                                  }}
                                />

                                <Text
                                style={{
                                  marginLeft: SIZES.radius,
                                  color: COLORS.white,
                                  fontWeight: '400'
                                }}>{item.name}</Text>
                            </View>
                          {/**lineChart section */}

                          <View style={{
                            flex: 1,
                            alignItems: 'center',
                          }}>
                              <LineChart 
                                withVerticalLabels={false}
                                withHorizontalLabels={false}
                                withDots={false}
                                withInnerLines={false}
                                withVerticalLines={false}
                                withOuterLines={false}
                                data={{
                                  datasets: [
                                    {
                                      data: item.sparkline_in_7d.price
                                    }
                                  ]
                                }}
                                width={100}
                                height={60}
                                chartConfig={{
                                  color: () => priceColor
                                }}
                                bezier
                                style={{
                                  paddingRight: 0
                                }}
                              />
                          </View>

                          {/**figures section */}
                          <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                          }}>
                              <Text style={{
                                color: COLORS.white,
                                fontWeight: '600'
                              }}>
                                $ {item.current_price}
                              </Text>

                              <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                              }}>
                                  {item.price_change_percentage_7d_in_currency!= 0 && 
                                  <Image 
                                      source={icons.upArrow}
                                      style={{
                                        height: 10,
                                        width:10,
                                        tintColor: priceColor,
                                        transform : item.price_change_percentage_7d_in_currency > 0 ? [{rotate: '25deg'}] : [{rotate: '125deg'}]
                                      }}
                                  />}

                                  <Text style={{
                                    marginLeft: 5,
                                    color: priceColor,
                                    fontWeight: '500',
                                  }}>
                                    {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                                  </Text>
                              </View>
                          </View>
                      </View>
                    )
                  }}
                />
            </View>
          )
        }}
      />
    )
  }

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black
        }}
      >
        {/**Header Bar */}
        <HeaderBar 
          title={"Market"}
        />

        {/**Tab Bar */}
          {renderTabBar()}

        {/**Buttons */}
          {renderButtons()}

        {/**Market List */}
          {renderList()}
        
      </View>
    </MainLayout>
  )
}

export default Market