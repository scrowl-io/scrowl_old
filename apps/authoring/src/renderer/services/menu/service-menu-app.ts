import { requester } from '..';
import { MenuEventsAppApi } from '../../../main/services/menu';

export const ENDPOINTS: MenuEventsAppApi = {
  aboutOpen: 'menu/about/open',
  preferencesOpen: 'menu/preferences/open',
};

const registerListener = (
  endpoint: typeof ENDPOINTS[keyof typeof ENDPOINTS],
  listener: requester.Listener
) => {
  requester.on(endpoint, listener);
};

export const onPreferenceOpen = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.preferencesOpen, listener);
};

export default {
  onPreferenceOpen,
};
