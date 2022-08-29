import { createSlice } from '@reduxjs/toolkit';
import { StateConfig } from '../../services/state/service-state.types';
import { ProjectInitialState } from './model-projects.types';

export const initialState: ProjectInitialState = {
  data: {
    name: '',
  },
  isProcessing: false,
  isInit: false,
  isExploring: false,
  isLoaded: false,
  isMenuReady: false,
};

export const config: StateConfig = {
  name: 'projects',
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
    loaded: (state, action) => {
      state.isLoaded = action.payload;
    },
    menuReady: (state, action) => {
      state.isMenuReady = action.payload;
    },
  },
};

export const slice = createSlice(config);

export const { update, process, init, explore, loaded, menuReady } =
  slice.actions;

export const reducer = slice.reducer;

export default {
  config,
  initialState,
};
