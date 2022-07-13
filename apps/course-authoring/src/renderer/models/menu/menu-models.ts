import { MENU_IPC_EVENTS } from '../../../main/services/menu/events';
import {
  on,
  send,
  removeAllListeners,
} from '../../services/requester/requester';

export const menuNewProject = (callback: (...args: unknown[]) => void) => {
  on(MENU_IPC_EVENTS.newProject, callback);
};

export const menuSaveProject = (callback: (...args: unknown[]) => void) => {
  on(MENU_IPC_EVENTS.saveProject, callback);
};

export const menuDisableItemById = (...args: unknown[]) => {
  send(MENU_IPC_EVENTS.toggleItem, ...args);
};

export const menuRemoveListeners = (listeners: string[]) => {
  listeners.forEach(listener => removeAllListeners(listener));
};

export default {
  menuNewProject,
  menuSaveProject,
  menuDisableItemById,
  removeAllListeners,
};
