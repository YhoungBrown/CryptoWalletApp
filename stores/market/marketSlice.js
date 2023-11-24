import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  myHoldings: [],
  coins: [],
  loading: false,
  error: null,
};


const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    getHoldingsBegin: state => {
      state.loading = true;
      state.error = null;
    },
    getHoldingsSuccess: (state, action) => {
      state.loading = false;
      state.myHoldings = action.payload;
    },
    getHoldingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCoinMarketBegin: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCoinMarketSuccess: (state, action) => {
      state.loading = false;
      state.coins = action.payload;
    },
    getCoinMarketFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export the actions
export const { getHoldingsBegin, getHoldingsSuccess, getHoldingsFailure, getCoinMarketBegin, getCoinMarketSuccess, getCoinMarketFailure } = marketSlice.actions;

//Export redux selectors
export const selectMyHoldings = (state) => state.market.myHoldings;
export const selectCoins = (state) => state.market.coins;


// Export the reducer
export default marketSlice.reducer;
