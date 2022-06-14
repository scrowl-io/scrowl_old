import React from 'react';
import { createRoot } from 'react-dom/client';
import { Element as App } from './components/app';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);

const render = () => {
  root.render(<App />);
};

render();
