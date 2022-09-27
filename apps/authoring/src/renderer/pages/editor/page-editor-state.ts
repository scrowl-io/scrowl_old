import { createSlice } from '@reduxjs/toolkit';
import { StateConfig } from '../../services/state/service-state.types';

export const config: StateConfig = {
  name: 'editor',
  initialState: {
    isInit: false,
    activeSlide: {},
    hasActiveSlide: false,
    activeSlidePosition: {
      moduleIdx: -1,
      lessonIdx: -1,
      slideIdx: -1,
    },
  },
  reducers: {
    init: (state, action) => {
      state.isInit = action.payload;
    },
    updateSlide: (state, action) => {
      if (!action.payload || !Object.keys(action.payload).length) {
        state.hasActiveSlide = false;
      } else {
        state.hasActiveSlide = true;
      }

      state.activeSlide = Object.assign(state.activeSlide, action.payload);
    },
    updateSlidePosition: (state, action) => {
      state.activeSlidePosition = Object.assign(
        state.activeSlidePosition,
        action.payload
      );
    },
    updateActiveSlideTemplate: (state, action) => {
      state.activeSlide.template = action.payload;
      state.editSlideRef.template = action.payload;
    },
  },
};

export const slice = createSlice(config);

export const {
  init,
  updateSlide,
  updateSlidePosition,
  updateActiveSlideTemplate,
} = slice.actions;

export const reducer = slice.reducer;

export default {
  config,
};
