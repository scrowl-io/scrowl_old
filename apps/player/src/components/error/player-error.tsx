import React from 'react';
import { ErrorProps } from './player-error.types';

export const Error = (props: ErrorProps) => {
  const { msg } = props;

  return (
    <div>
      <h1>Error</h1>
      <p>{msg}</p>
    </div>
  );
};

export default {
  Error,
};
