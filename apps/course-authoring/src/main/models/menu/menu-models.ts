import { IpcMainInvokeEvent, Menu, MenuItemConstructorOptions } from 'electron';
import { ModelEventProps } from '../index';
import { menuFile } from '../../menu/file';

const DARWIN = process.platform === 'darwin';
const separator: MenuItemConstructorOptions = { type: 'separator' };
const template: MenuItemConstructorOptions[] = [];

const buildDefaultMenu = (): MenuItemConstructorOptions[] => {
  if (DARWIN) {
    template.push({
      label: 'Scrowl',
      submenu: [
        {
          label: 'About Scrowl',
          click: () => console.log('Open about Scrowl window...'),
          id: 'about',
        },
        separator,
        {
          label: 'Preferences…',
          id: 'preferences',
          accelerator: 'CmdOrCtrl+,',
          click: () => console.log('Open preferences window...'),
        },
        separator,
        {
          role: 'services',
          submenu: [],
        },
        separator,
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        separator,
        { role: 'quit' },
      ],
    });
  }

  template.push(menuFile);

  return template;
};

export const toggleEnableItemById = (
  event: IpcMainInvokeEvent,
  menuItemId: string
) => {
  const applicationMenu = Menu.getApplicationMenu();
  const disabledMenu = applicationMenu?.getMenuItemById(menuItemId);

  if (disabledMenu) disabledMenu.enabled = !disabledMenu.enabled;
};

export const initMenu = () => {
  const menuTemplate = buildDefaultMenu();
  const menu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(menu);
};

export const EVENTS: ModelEventProps[] = [
  {
    name: 'menu:toggle-enable',
    type: 'on',
  },
  {
    name: 'menu:new-project',
    type: 'on',
  },
  {
    name: 'menu:save',
    type: 'on',
  },
  {
    name: 'menu:toggle-enable',
    fn: toggleEnableItemById,
    type: 'on',
  },
];

export default {
  EVENTS,
  initMenu,
  toggleEnableItemById,
};
