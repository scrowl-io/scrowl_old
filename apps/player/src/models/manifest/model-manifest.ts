import { GetResult, ProjectData } from './model-manifest.types';

export const get = (): GetResult => {
  if (!window.__SCROWL_MANIFEST) {
    return {
      error: true,
      message: 'Unable to find project manifest',
    };
  } else {
    return {
      error: false,
      data: window.__SCROWL_MANIFEST as ProjectData,
    };
  }
};

export default {
  get,
};
