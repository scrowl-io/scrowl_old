import { MenuItemConstructorOptions } from 'electron';
import { menuApp } from './app-menu';
import { menuFile, menuIds as fileMenuIds } from './file-menu';

const template: MenuItemConstructorOptions[] = [];

export const buildMenuTemplate = (
  isMacOs: boolean
): MenuItemConstructorOptions[] => {
  if (isMacOs) {
    template.push(menuApp);
  }

  template.push(menuFile);

  return template;
};

export default {
  template,
  fileMenuIds,
};
