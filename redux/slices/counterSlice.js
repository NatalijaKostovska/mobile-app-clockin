import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1; // Direct mutation is safe; Immer handles immutability
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload; // Use payload for custom amounts
    },
  },
});

// Export actions to dispatch them in components
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export the reducer to configure it in the store
export default counterSlice.reducer;
