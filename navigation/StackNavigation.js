import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { store } from '../stores/store'
import { Provider } from 'react-redux'

import BottomTabNav from './BottomTabNav';


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Provider store={store}>
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='BottomTabNav' component={BottomTabNav} options={{headerShown: false}}/>
            </Stack.Navigator>
            <StatusBar style='auto'/>
        </NavigationContainer>
    </SafeAreaProvider>
    </Provider>
  )
}

export default StackNavigation