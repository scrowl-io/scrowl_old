import { nativeTheme } from 'electron';
import { ApiResult } from '../requester';

export const getSystemPreferences = (): ApiResult => {
  try {
    return {
      error: false,
      data: {
        'theme-os': nativeTheme.shouldUseDarkColors ? 'dark' : 'light',
      },
    };
  } catch (e) {
    return {
      error: true,
      message: 'Failed to get system preferences',
      data: {
        trace: e,
      },
    };
  }
};

export default {
  getSystemPreferences,
};
