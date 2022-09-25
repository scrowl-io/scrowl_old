export const hasProp = (obj: object, prop: string) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

export const deepCopy = (obj: object) => {
  return JSON.parse(JSON.stringify(obj));
};

export default {
  hasProp,
  deepCopy,
};
