import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepCopy = (obj?: any) => {
  if (!obj) {
    return;
  }

  return JSON.parse(JSON.stringify(obj));
};

export const logEventAction = (ev: React.MouseEvent<Element, MouseEvent>) => {
  console.log('user event', ev);
};

export const addLeadZero = (val: number | string) => {
  return `0${val}`.slice(-2);
};

export default {
  deepCopy,
  logEventAction,
  addLeadZero,
};
