import { createSlice } from '@reduxjs/toolkit';
import { StateConfig } from '../../services/state/service-state.types';

export const config: StateConfig = {
  name: 'preferences',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state, action) => {
      const increase = action.payload ? action.payload : 1;

      state.value += increase;
    },
  },
};

export const slice = createSlice(config);

export const { increment } = slice.actions;

export const reducer = slice.reducer;

export default {
  config,
};
