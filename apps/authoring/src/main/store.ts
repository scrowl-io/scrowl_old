import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { projectSlice } from './services/state/index';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    // [projectsApi.reducerPath]: projectsApi.reducer,
    project: projectSlice.reducer,
  },

  //   middleware: getDefaultMiddleware =>
  // getDefaultMiddleware().concat(projectsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const createProject = (state: RootState) => state.project;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
setupListeners(store.dispatch);
