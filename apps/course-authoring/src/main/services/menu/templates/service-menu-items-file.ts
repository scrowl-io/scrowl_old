import { MenuItemConstructorOptions } from 'electron';
import { send, registerAll } from '../../requester';
import { MenuItemEventsFile } from '../service-menu.types';

const separator: MenuItemConstructorOptions = { type: 'separator' };

export const EVENTS: MenuItemEventsFile = {
  projectNew: {
    id: 'new-project',
    name: 'menu/project/new',
    type: 'on'
  },
  projectSave: {
    id: 'save-project',
    name: 'menu/project/save',
    type: 'on'
  },
  projectSaveAs: {
    id: 'save-project-as',
    name: 'menu/project/save',
    type: 'on'
  }
};

export const template: MenuItemConstructorOptions = {
  label: 'File',
  submenu: [
    {
      label: 'New Project...',
      id: EVENTS.projectNew?.id,
      click: send(EVENTS.projectNew.name),
      accelerator: 'CmdOrCtrl+N',
    },
    separator,
    {
      label: 'Save',
      id: EVENTS.projectSave?.id,
      click: send(EVENTS.projectSave.name, false),
      accelerator: 'CmdOrCtrl+S',
    },
    {
      label: 'Save As...',
      id: EVENTS.projectSaveAs?.id,
      click: send(EVENTS.projectSaveAs.name, true),
      accelerator: 'CmdOrCtrl+Shift+S',
    },
  ],
};

export const init = () => {
  registerAll(EVENTS);
};

export default {
  EVENTS,
  init,
  template,
};
