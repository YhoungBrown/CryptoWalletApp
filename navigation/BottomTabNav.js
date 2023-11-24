import { View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';

import Home from '../screens/Home';
import Portfolio from '../screens/Portfolio';
//import Trade from '../screens/Index';
import Market from '../screens/Market';
import Profile from '../screens/Profile';
import TabIcon from '../components/TabIcon';
import {COLORS, icons} from '../constants'
import { selectTradeModalVisibility, setTradeModalVisibilitySuccess } from '../stores/tab/tabSlice';



const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({children, onPress}) => {
  return(
    <TouchableOpacity
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
        {children}
    </TouchableOpacity>
  )
}


const BottomTabNav = () => {
  const dispatch = useDispatch();
  const TradeModalVisibility = useSelector(selectTradeModalVisibility);
  //const TradeModalVisibility = useSelector((state) => state.tab.isVisible);

  function tradeTabButtonOnClickHandler() {
    dispatch(setTradeModalVisibilitySuccess(!TradeModalVisibility))
    console.log(TradeModalVisibility)
  }

  return (
    <Tab.Navigator 
        initialRouteName='Home' 
        screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
             height: 140,
             elevation: 0,
             backgroundColor: COLORS.primary,
             borderTopColor: "transparent",
        }
      }}
    >
      <Tab.Screen 
      name="Home" 
      component={Home} 
      options={{
        tabBarIcon: ({focused}) => {
          if (!TradeModalVisibility){
            return (
              <TabIcon 
                focused={focused}
                icon={icons.home}
                label={"Home"}
              />
            )
          }
        }
      }}
      listeners={{
        tabPress: e => {
          if(TradeModalVisibility){
            e.preventDefault()
          }
        }
      }}
      />
      <Tab.Screen 
      name="Potfolio" 
      component={Portfolio}
      options={{
        tabBarIcon: ({focused}) => {
          if (!TradeModalVisibility){
            return (
              <TabIcon 
                focused={focused}
                icon={icons.briefcase}
                label={"Portfolio"}
              />
            )
          }
        }
      }}
      listeners={{
        tabPress: e => {
          if(TradeModalVisibility){
            e.preventDefault()
          }
        }
      }}
      />
      <Tab.Screen 
      name="Trade" 
      component={Home} 
      options={{
        tabBarIcon: ({focused}) => {
            return (
              <TabIcon 
                focused={focused}
                icon={TradeModalVisibility ? icons.close : icons.trade}
                iconStyle={TradeModalVisibility ? {width: 15, height: 15} : null}
                label={TradeModalVisibility ? "close" : "Trade"}
                isTrade={true}
              />
            )
        },
        tabBarButton: (props) => (
          <TabBarCustomButton 
            {...props}
            onPress={() => tradeTabButtonOnClickHandler()}
          />
        )
      }}
      />
      <Tab.Screen 
      name="Market" 
      component={Market} 
      options={{
        tabBarIcon: ({focused}) => {
          if(!TradeModalVisibility){
            return (
              <TabIcon 
                focused={focused}
                icon={icons.market}
                label={"Market"}
              />
            )
          }
        }
      }}
      listeners={{
        tabPress: e => {
          if(TradeModalVisibility){
            e.preventDefault()
          }
        }
      }}
      />
      <Tab.Screen 
      name="Profile" 
      component={Profile} 
      options={{
        tabBarIcon: ({focused}) => {
          if(!TradeModalVisibility){
            return (
              <TabIcon 
                focused={focused}
                icon={icons.profile}
                label={"Profile"}
              />
            )
          }
        }
      }}
      listeners={{
        tabPress: e => {
          if(TradeModalVisibility){
            e.preventDefault()
          }
        }
      }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNav