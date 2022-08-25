import { configureStore } from '@reduxjs/toolkit';
import { StoreConfig } from './service-state.types';
import { Preferences } from '../../models';

export const init = () => {
  const states = [
    {
      name: Preferences.state.config.name,
      reducer: Preferences.state.reducer,
    },
  ];
  const config: StoreConfig = {
    reducer: {},
  };

  states.forEach(state => {
    config.reducer[state.name] = state.reducer;
  });

  return configureStore(config);
};

export default {
  init,
};
