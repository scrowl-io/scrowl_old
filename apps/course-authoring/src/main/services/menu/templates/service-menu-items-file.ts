import { MenuItemConstructorOptions } from 'electron';
import { send } from '../../requester';
import { MenuItems, MenuEvents } from '../service-menu.types';

const separator: MenuItemConstructorOptions = { type: 'separator' };

export const ITEMS: MenuItems = {
  newProject: {
    id: 'new-project',
    event: 'menu/new-project',
  },
  saveProject: {
    id: 'save-project',
    event: 'menu/save-project',
  },
  saveProjectAs: {
    id: 'save-project-as',
    event: 'menu/save-project',
  },
}

export const events:MenuEvents = [
  {
    name: ITEMS.newProject.event,
    type: 'on',
  },
  {
    name: ITEMS.saveProject.event,
    type: 'on',
  }
];

export const template: MenuItemConstructorOptions = {
  label: 'File',
  submenu: [
    {
      label: 'New Project...',
      id: ITEMS.newProject.id,
      click: send(ITEMS.newProject.event),
      accelerator: 'CmdOrCtrl+N',
    },
    separator,
    {
      label: 'Save',
      id: ITEMS.saveProject.id,
      click: send(ITEMS.saveProject.event, false),
      accelerator: 'CmdOrCtrl+S',
    },
    {
      label: 'Save As...',
      id: ITEMS.saveProjectAs.id,
      click: send(ITEMS.saveProjectAs.event, true),
      accelerator: 'CmdOrCtrl+Shift+S',
    },
  ],
};

export default {
  ITEMS,
  events,
  template,
};
