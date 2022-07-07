import { on, send } from '../services/requester/requester';

export const menuNewProject = (callback: (...args: unknown[]) => void) => {
  on('menu:new-project', callback);
};

export const menuSaveProject = (callback: (...args: unknown[]) => void) => {
  on('menu:save', callback);
};

export const menuDisableItemById = (...args: unknown[]) => {
  send('menu:toggle-enable', ...args);
};

export default {
  menuNewProject,
  menuSaveProject,
  menuDisableItemById,
};
