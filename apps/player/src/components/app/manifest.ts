import { Manifest } from "./app.types";

export const get = () => {
  const result: Manifest = {
    error: false,
    message: ''
  };

  if (!window.__SCROWL_MANIFEST) {
    result.error = true;
    result.message = 'Unable to find project manifest';
  } else {
    result.data = window.__SCROWL_MANIFEST;
  }

  return result;
};

export default {
  get,
};
