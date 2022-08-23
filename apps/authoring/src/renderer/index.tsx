import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app';
import { Menu } from './services';
import { Provider } from 'react-redux';
import store from './store';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
const initializations = [Menu.Global.init()];

const render = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

Promise.allSettled(initializations).then(render);
