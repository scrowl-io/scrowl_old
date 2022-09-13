import { createSlice } from '@reduxjs/toolkit';
import { StateConfig } from '../../services/state/service-state.types';

export const config: StateConfig = {
  name: 'editor',
  initialState: {
    isInit: false,
    activeSlide: {},
  },
  reducers: {
    init: (state, action) => {
      state.isInit = action.payload;
    },
    updateSlide: (state, action) => {
      state.activeSlide = Object.assign(state.activeSlide, action.payload);
    },
  },
};

export const slice = createSlice(config);

export const { init, updateSlide } = slice.actions;

export const reducer = slice.reducer;

export default {
  config,
};
