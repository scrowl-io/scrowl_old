import { MenuItemConstructorOptions, KeyboardEvent } from 'electron';
import { MenuItemEventsFile } from '../service-menu.types';
import { send } from '../../requester';
import { Project } from '../../../models';

const separator: MenuItemConstructorOptions = { type: 'separator' };

// these events are registered by the project model
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
        // TODO refactor this so that FE opens a modal to view all projects
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
        send(EVENTS.importFile.name);
      },
      accelerator: 'CmdOrCtrl+I',
    },
  ],
};

export default {
  EVENTS,
  template,
};
