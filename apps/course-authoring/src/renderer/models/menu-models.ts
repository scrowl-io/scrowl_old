import { on, send, removeAllListeners } from '../services/requester/requester';

export const menuNewProject = (callback: (...args: unknown[]) => void) => {
  on('menu:new-project', callback);
};

export const menuSaveProject = (callback: (...args: unknown[]) => void) => {
  on('menu:save', callback);
};

export const menuDisableItemById = (...args: unknown[]) => {
  send('menu:toggle-enable', ...args);
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
