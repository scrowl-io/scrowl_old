import { MenuItemConstructorOptions, KeyboardEvent } from 'electron';
import { MenuItemEventsFile } from '../service-menu.types';
// import { send, registerAll } from '../../requester';
import { Project } from '../../../models';
import { send } from '../../requester';

const separator: MenuItemConstructorOptions = { type: 'separator' };

export const EVENTS: MenuItemEventsFile = {
  projectsCreate: {
    id: 'new-project',
    name: '/projects/create',
    type: 'send',
  },
  projectOpen: {
    id: 'open-project',
    name: '/projects/open',
    type: 'send',
  },
  projectSave: {
    id: 'save-project',
    name: '/projects/save',
    type: 'send',
  },
  importFile: {
    id: 'import-file',
    name: 'menu/project/import',
    type: 'send',
  },
};

export const template: MenuItemConstructorOptions = {
  label: 'File',
  submenu: [
    {
      label: 'New Project...',
      id: EVENTS.projectsCreate.id,
      click: (menuItem, window, ev: KeyboardEvent) => {
        Project.create();
      },
      accelerator: 'CmdOrCtrl+N',
    },
    separator,
    {
      label: 'Open...',
      id: EVENTS.projectOpen.id,
      click: (menuItem, window, ev: KeyboardEvent) => {
        // send(EVENTS.projectOpen.name);
      },
      accelerator: 'CmdOrCtrl+O',
    },
    separator,
    {
      label: 'Save',
      id: EVENTS.projectSave.id,
      enabled: false,
      click: (menuItem, window, ev: KeyboardEvent) => {
        send(EVENTS.projectSave.name);
      },
      accelerator: 'CmdOrCtrl+S',
    },
    separator,
    {
      label: 'Import File',
      id: EVENTS.importFile.id,
      enabled: false,
      click: (menuItem, window, ev: KeyboardEvent) => {
        // send(EVENTS.importFile.name, true);
      },
      accelerator: 'CmdOrCtrl+I',
    },
  ],
};

export const init = () => {
  // registerAll(EVENTS);
};

export default {
  EVENTS,
  init,
  template,
};
