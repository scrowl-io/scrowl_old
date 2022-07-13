import React from 'react';
import { ErrorProps } from './app.types';

export const Element = (props: ErrorProps) => {
  const { msg } = props;

  return (
    <div>
      <h1>Error</h1>
      <p>{msg}</p>
    </div>
  );
};

export default {
  Element,
};
