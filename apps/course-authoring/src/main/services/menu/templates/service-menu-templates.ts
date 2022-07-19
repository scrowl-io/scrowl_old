import { MenuItemConstructorOptions } from 'electron';
import { MenuEvents } from '../service-menu-types';
import {
  template as menuTempApp,
  ITEMS as appItems,
  events as appItemEvents,
} from './service-menu-items-app';
import {
  template as menuTempFile,
  ITEMS as fileItems,
  events as fileItemEvents,
} from './service-menu-items-file';

export const menu: MenuItemConstructorOptions[] = [];

export const ITEMS = Object.assign({}, appItems, fileItems);

export const events:MenuEvents = appItemEvents.concat(fileItemEvents);

export const createMenu = (
  isMacOs: boolean
): MenuItemConstructorOptions[] => {
  if (isMacOs) {
    menu.push(menuTempApp);
  }

  menu.push(menuTempFile);

  return menu;
};

export default {
  menu,
  ITEMS,
  events,
  createMenu,
};
