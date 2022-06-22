import { ipcMain } from 'electron';
import { openFile, saveProject } from './handlers';

export const events = {
  openFile: 'open-file',
  saveProject: 'save-project',
};

export const init = () => {
  ipcMain.handle(events.openFile, openFile);
  ipcMain.handle(events.saveProject, saveProject);
};

export default {
  events,
  init,
  openFile,
};
