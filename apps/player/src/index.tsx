import React from 'react';
import { createRoot } from 'react-dom/client';
import * as App from './components/app';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);

const render = () => {
  const runtime = window.__SCROWL_RUNTIME;

  if (runtime) {
    const startRes = runtime.start();

    if (startRes.error) {
      // root.render(<Error msg={startRes.message} />);
      console.error(`starting error: ${startRes.message}`);
    }
  }

  root.render(<App.Main />);
};

render();
