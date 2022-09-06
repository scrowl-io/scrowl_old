import { nativeTheme } from 'electron';
import { ApiResult } from '../requester';

export const getPreferences = () => {
  return new Promise<ApiResult>(resolve => {
    try {
      const theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'default';

      resolve({
        error: false,
        data: {
          theme,
        },
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to get system preferences',
        data: {
          trace: e,
        },
      });
    }
  });
};

export default {
  getPreferences,
};
