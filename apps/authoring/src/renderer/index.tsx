import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app';
import { Provider } from 'react-redux';
import { State } from './services';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
const store = State.init();

const render = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

render();
