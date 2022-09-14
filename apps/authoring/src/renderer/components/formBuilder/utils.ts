// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepCopy = (obj?: any) => {
  if (!obj) {
    return;
  }

  return JSON.parse(JSON.stringify(obj));
};

export default {
  deepCopy,
};
