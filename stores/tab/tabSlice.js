import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isVisible: false,
}

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setTradeModalVisibilitySuccess: (state, action) => {
        state.isVisible = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTradeModalVisibilitySuccess } = tabSlice.actions

//export const setTradeModalVisibility = (isVisible) => (dispatch) => {
   // dispatch(setTradeModalVisibilitySuccess({ isVisible }));
 // };
  
  export const selectTradeModalVisibility = (state) => state.tab.isVisible;
  

export default tabSlice.reducer




