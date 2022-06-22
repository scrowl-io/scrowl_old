import { ipcMain } from 'electron';
import { newProject, openFile, saveProject } from './handlers';

export const events = {
  openFile: 'open-file',
  saveProject: 'save-project',
  newProject: 'new-project',
};

export const init = () => {
  ipcMain.handle(events.openFile, openFile);
  ipcMain.handle(events.saveProject, saveProject);
  ipcMain.handle(events.newProject, newProject);
};

export default {
  events,
  init,
  openFile,
};
