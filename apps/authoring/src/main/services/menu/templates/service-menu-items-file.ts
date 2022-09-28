/* eslint-disable @typescript-eslint/no-unused-vars */
import { MenuItemConstructorOptions, KeyboardEvent } from 'electron';
import { MenuItemEventsFile } from '../service-menu.types';
import { send } from '../../requester';

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
  projectPublish: {
    id: 'publish-project',
    name: '/projects/publish',
    type: 'send',
  },
  // importFile: {
  //   id: 'import-file',
  //   name: 'project/import-file',
  //   type: 'send',
  // },
  // templateAdd: {
  //   id: 'template-install',
  //   name: '/templates/install',
  //   type: 'send',
  // },
  // templateOpen: {
  //   id: 'template-open',
  //   name: '/templates/open',
  //   type: 'send',
  // },
};

export const template: MenuItemConstructorOptions = {
  label: 'File',
  submenu: [
    {
      label: 'New Project...',
      id: EVENTS.projectsCreate.id,
      click: (menuItem, window, ev: KeyboardEvent) => {
        send(EVENTS.projectsCreate.name);
      },
      accelerator: 'CmdOrCtrl+N',
    },
    separator,
    {
      label: 'Open Project...',
      id: EVENTS.projectOpen.id,
      click: (menuItem, window, ev: KeyboardEvent) => {
        // TODO refactor this so that FE opens a modal to view all projects
        send(EVENTS.projectOpen.name);
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
      label: 'Publish',
      id: EVENTS.projectPublish.id,
      enabled: false,
      click: (MenuItem, window, ev: KeyboardEvent) => {
        send(EVENTS.projectPublish.name);
      },
      accelerator: 'CmdorCtrl+P',
    },
    // separator,
    // {
    //   label: 'Import File',
    //   id: EVENTS.importFile.id,
    //   enabled: false,
    //   click: (menuItem, window, ev: KeyboardEvent) => {
    //     send(EVENTS.importFile.name);
    //   },
    //   accelerator: 'CmdOrCtrl+I',
    // },
    // {
    //   label: 'Explore Templates',
    //   id: EVENTS.templateOpen.id,
    //   enabled: false,
    //   click: (MenuItem, window, ev: KeyboardEvent) => {
    //     send(EVENTS.templateOpen.name);
    //   },
    //   accelerator: 'CmdOrCtrl+t',
    // },
    // {
    //   label: 'Install Template',
    //   id: EVENTS.templateAdd.id,
    //   enabled: false,
    //   click: (MenuItem, window, ev: KeyboardEvent) => {
    //     send(EVENTS.templateAdd.name);
    //   },
    //   accelerator: 'CmdOrCtrl+Shift+t',
    // },
  ],
};

export default {
  EVENTS,
  template,
};
