import { Menu } from '../../../main/services';
import {
  on,
  off,
  send,
} from './requests-global';

export const newProject = (callback: (...args: unknown[]) => void) => {
  on(Menu.ITEMS.newProject.event, callback);
};

export const saveProject = (callback: (...args: unknown[]) => void) => {
  on(Menu.ITEMS.saveProject.event, callback);
};

export const toggleItem = (...args: unknown[]) => {
  send(Menu.ITEMS.toggleItem.event, ...args);
};

export const disableItem = (...endpoints: string[]) => {
  endpoints.forEach(endpoint => off(endpoint));
};

export default {
  newProject,
  saveProject,
  toggleItem,
  disableItem,
};
