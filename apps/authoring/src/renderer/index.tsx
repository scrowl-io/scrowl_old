import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app';
import { Menu } from './services';
import { Preferences } from './models';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
const prefs = new Preferences();
const initializations = [Menu.Global.init(), prefs.get()];

const render = () => {
  root.render(<App />);
};

Promise.allSettled(initializations).then(render);
