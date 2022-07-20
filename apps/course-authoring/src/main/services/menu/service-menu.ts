import { Menu } from 'electron';
import {
    EVENTS as globalEvents,
    init as globalInit,
} from './service-menu-globals';
import { createMenu } from './templates';

export const init = (isMacOs: boolean) => {
  const menuConfig = createMenu(isMacOs);
  const menu = Menu.buildFromTemplate(menuConfig.template);
  const items = Object.assign(globalEvents, menuConfig.EVENTS);

  globalInit(items);
  Menu.setApplicationMenu(menu);
};

export default {
  init,
};
