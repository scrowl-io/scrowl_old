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
  importFile: {
    id: 'import-file',
    name: 'project/import-file',
    type: 'send',
  },
  templateAdd: {
    id: 'template-install',
    name: '/templates/install',
    type: 'send',
  },
  templateOpen: {
    id: 'template-open',
    name: '/templates/open',
    type: 'send',
  },
};

export const template: any = {
  label: 'Edit',
  submenu: [
    {
      label: 'Copy',
      selector: 'copy:',
      accelerator: 'CmdOrCtrl+C',
    },
    {
      label: 'Paste',
      selector: 'paste:',
      accelerator: 'CmdOrCtrl+V',
    },
  ],
};

export default {
  EVENTS,
  template,
};
