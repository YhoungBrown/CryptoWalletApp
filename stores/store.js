import { configureStore } from '@reduxjs/toolkit'
import tabReducer from './tab/tabSlice';
import marketReducer from './market/marketSlice';

export const store = configureStore({
  reducer: {
    tab: tabReducer,
    market: marketReducer,
  },
})