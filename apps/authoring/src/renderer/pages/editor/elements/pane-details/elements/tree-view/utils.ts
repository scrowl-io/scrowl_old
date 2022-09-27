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

export const moveTreeItem = (
  from: number,
  to: number,
  list: Array<unknown>
) => {
  if (to < 0) {
    console.warn('Unable to move item: index to low', from, to, list);
    return;
  }

  if (to >= list.length) {
    console.warn('Unable to move item: index to high', from, to, list);
    return;
  }

  const item = list.splice(from, 1)[0];

  list.splice(to, 0, item);
  return item;
};

export default {
  deepCopy,
  logEventAction,
  addLeadZero,
};
