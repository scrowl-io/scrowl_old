import { MenuItemConstructorOptions } from 'electron';
import { send, registerAll } from '../../requester';
import { MenuItemEventsFile } from '../service-menu.types';
import { Project as ProjectModel } from '../../../models/project';

const separator: MenuItemConstructorOptions = { type: 'separator' };

export const EVENTS: MenuItemEventsFile = {
  projectNew: {
    id: 'new-project',
    name: 'menu/project/new',
    type: 'send',
  },
  projectOpen: {
    id: 'open-project',
    name: 'menu/project/open',
    type: 'send',
  },
  projectSave: {
    id: 'save-project',
    name: 'menu/project/save',
    type: 'send',
  },
  projectSaveAs: {
    id: 'save-project-as',
    name: 'menu/project/save-as',
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
      id: EVENTS.projectNew.id,
      click: () => {
        send(EVENTS.projectNew.name);
      },
      accelerator: 'CmdOrCtrl+N',
    },
    separator,
    {
      label: 'Open...',
      id: EVENTS.projectOpen.id,
      click: async () => {
        const openProjectData = await ProjectModel.open();

        send(EVENTS.projectOpen.name, openProjectData);
      },
      accelerator: 'CmdOrCtrl+O',
    },
    separator,
    {
      label: 'Save',
      id: EVENTS.projectSave.id,
      click: () => {
        send(EVENTS.projectSave.name, false);
      },
      accelerator: 'CmdOrCtrl+S',
    },
    {
      label: 'Save As...',
      id: EVENTS.projectSaveAs.id,
      click: () => {
        send(EVENTS.projectSaveAs.name, true);
      },
      accelerator: 'CmdOrCtrl+Shift+S',
    },
    {
      label: 'Import File',
      id: EVENTS.importFile.id,
      click: () => {
        send(EVENTS.importFile.name, true);
      },
      accelerator: 'CmdOrCtrl+I',
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
