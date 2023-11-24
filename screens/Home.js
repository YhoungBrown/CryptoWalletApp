import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getHoldings, getHoldingsBegin, getHoldingsFailure, getHoldingsSuccess, selectCoins, selectMyHoldings, getCoinMarketBegin, getCoinMarketSuccess, getCoinMarketFailure} from '../stores/market/marketSlice';
import { useCallback } from 'react';

import MainLayout from './MainLayout'
import { SIZES, COLORS, dummyData, icons} from '../constants';
import axios from 'axios';
import BalanceInfo from '../components/BalanceInfo';
import { IconTextButton  } from '../components';
import Chart from '../components/Chart';





const Home = () => {
  const dispatch = useDispatch();
 const  myHoldings = useSelector(selectMyHoldings);
  const coins = useSelector(selectCoins);
  




  const getHoldings = async (holdings = [], currency = 'usd', orderBy = 'market_cap_desc', sparkline = true, priceChangePercentage = '7d', perPage = 10, page = 1) => {
    dispatch(getHoldingsBegin());
    //console.log(holdings);
    
    try {
     // const ids = holdings.map(item => item.id).join('');
      const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePercentage}&locale=en`;
      //console.log(apiUrl);

      

  
       await axios(apiUrl, {
        url: apiUrl,
        method: "GeT",
        headers: {
          Accept: 'application/json',
        },
      }).then((response) => {
          //console.log("GetHoldings");
          //console.log(response);
          
  
          if (response.status === 200) {
            const myHoldings = response.data.map(item => {
              const coin = holdings.find(a => a.id === item.id);

              if (coin) {
                //console.log("Coin :" + coin)
                const price7d = item.current_price / (1 + item.price_change_percentage_7d_in_currency * 0.01);
            
                return {
                  id: item.id,
                  symbol: item.symbol,
                  name: item.name,
                  image: item.image,
                  current_price: item.current_price,
                  qty: coin.qty,
                  total: coin.qty * item.current_price,
                  price_change_percentage_7d_in_currency: item.price_change_percentage_7d_in_currency,
                  holding_value_change_7d: (item.current_price - price7d) * coin.qty,
                  sparkline_in_7d: {
                    value: item.sparkline_in_7d.price.map(price => price * coin.qty),
                  },
                };
              } else {
                // Handle the case where there is no corresponding entry in holdings
                console.log(`No matching entry in holdings for coin with id: ${item.id}`);
                return null; // or provide a default value or handle it according to your logic
              }

            });
            //console.log("myHoldings");
            //console.log(myHoldings);
            dispatch(getHoldingsSuccess(myHoldings));
          } else {
            dispatch(getHoldingsFailure(response.data));
          }
      }).catch((error) => {
        console.log("Alert: AxiosError:" + error.message)
        dispatch(getHoldingsFailure("Alert: AxiosError:" + error.message));
      })
    } catch (error) {
      dispatch(getHoldingsFailure("Alert: AxiosError:" + error.message));
    }
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



  useFocusEffect(
    useCallback(() => {
      getHoldings(holdings = dummyData.holdings);
      getCoinMarket();
    }, [])
  )


  let totalWallet = myHoldings.reduce((a, b) => a + ((b && b.total) || 0), 0);
  let valueChange = myHoldings.reduce((a, b) => a + ((b && b.holding_value_change_7d) || 0), 0);
  let percChange = valueChange / (totalWallet -valueChange) * 100
  


  function renderWalletInfoSection(){
    return(
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
          {/**Balance Info section */}
          <BalanceInfo 
            title="Your Wallet"
            displayAmount={totalWallet}
            changePct={percChange}
            containerStyle={{
              marginTop: 50
            }}
          />

          {/**Buttons */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              marginBottom: -15,
              paddingHorizontal: SIZES.radius,
            }}
          >
            <IconTextButton 
              label={"Transfer"}
              icon={icons.send}
              containerStyle={{
                flex: 1,
                height: 40,
                marginRight: SIZES.radius
              }}
              onPress={() => console.log("Transfer")}
            />
            <IconTextButton 
              label={"Withdral"}
              icon={icons.withdraw}
              containerStyle={{
                flex: 1,
                height: 40,
              }}
              onPress={() => console.log("Withdral")}
            />

          </View>
      </View>
    )
  }

  return (
    <MainLayout>
      <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}>
      {/**Header Section - wallet info */}
      {renderWalletInfoSection()}

      {/** Chart Section */}

      <Chart 
          constainerStyle={{
            marginTop: SIZES.padding * 2
          }}
          chartPrices={coins[0]?.sparkline_in_7d.price}
        />

      {/**Top Cryptocurrency */}
        
      </View>
    </MainLayout>
  )
}

export default Home