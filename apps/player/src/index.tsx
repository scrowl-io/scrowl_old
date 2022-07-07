import React from 'react';
import { createRoot } from 'react-dom/client';
import { Element as App, Error } from './components/app';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);

const render = () => {
  const runtime = window.scrowlRuntime;

  if (runtime) {
    const startRes = runtime.start();

    if (startRes.error) {
      root.render(<Error msg={startRes.message} />);
      return;
    }
  }

  root.render(<App />);
};

render();
