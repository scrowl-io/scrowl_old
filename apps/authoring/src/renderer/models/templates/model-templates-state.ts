import { createSlice } from '@reduxjs/toolkit';
import { StateConfig } from '../../services/state/service-state.types';
import { TemplateInitialState } from './model-templates.types';

export const initialState: TemplateInitialState = {
  data: {
    name: '',
  },
  isProcessing: false,
  isInit: false,
  isExploring: false,
};

export const config: StateConfig = {
  name: 'templates',
  initialState: initialState,
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
    explore: (state, action) => {
      state.isExploring = action.payload;
    },
  },
};

export const slice = createSlice(config);

export const { update, process, init, explore } = slice.actions;

export const reducer = slice.reducer;

export default {
  config,
  initialState,
};
