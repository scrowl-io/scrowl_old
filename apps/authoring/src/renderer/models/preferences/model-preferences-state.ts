import { createSlice } from '@reduxjs/toolkit';
import { StateConfig } from '../../services/state/service-state.types';

export const config: StateConfig = {
  name: 'preferences',
  initialState: {
    data: {},
    isProcessing: false,
    isInit: false,
  },
  reducers: {
    update: (state, action) => {
      state.data = Object.assign(state.data, action.payload);
    },
    process: (state, action) => {
      state.isProcessing = action.payload;
    },
    init: (state, action) => {
      state.isInit = action.payload;
    },
  },
};

export const slice = createSlice(config);

export const { update, process, init } = slice.actions;

export const reducer = slice.reducer;

export default {
  config,
};
