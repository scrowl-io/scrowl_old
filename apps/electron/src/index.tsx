import React from 'react';
import { Default as Button } from '@owlui/button';
import { Default as TextField } from '@owlui/textfield';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Button appearance="Primary">OwlUI Button</Button>
      <TextField appearance="Primary"></TextField>
      <h1>Hello from React!</h1>
    </div>
  );
};

export default App;
