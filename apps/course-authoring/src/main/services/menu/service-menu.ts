import { Menu } from 'electron';
import { events as globalEvents } from './service-menu-globals';
import {
  createMenu,
  ITEMS as menuItems,
  events as ItemEvents,
} from './templates';

export const ITEMS = menuItems;

export const init = (isMacOs: boolean) => {
  const menuTemplate = createMenu(isMacOs);
  const menu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(menu);
};

export const events = [globalEvents].concat(ItemEvents);

export default {
  ITEMS,
  events,
  init,
};
