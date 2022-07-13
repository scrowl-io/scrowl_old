import { Menu } from 'electron';
import { MENU_IPC_EVENTS, toggleEnableItemById } from './events';
import { ModelEventProps } from '../../models/index';
import { buildMenuTemplate } from './templates';

export const init = (isMacOs: boolean) => {
  const menuTemplate = buildMenuTemplate(isMacOs);
  const menu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(menu);
};

export const EVENTS: ModelEventProps[] = [
  {
    name: MENU_IPC_EVENTS.newProject,
    type: 'on',
  },
  {
    name: MENU_IPC_EVENTS.saveProject,
    type: 'on',
  },
  {
    name: MENU_IPC_EVENTS.toggleItem,
    fn: toggleEnableItemById,
    type: 'on',
  },
];

export default {
  EVENTS,
  init,
};
