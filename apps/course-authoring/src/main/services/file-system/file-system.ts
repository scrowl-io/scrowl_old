import { ipcMain } from 'electron';
import { openFileDialog, saveProject } from './handlers';

export const events = {
  findAndOpenFile: 'find-and-open-file',
  saveProject: 'save-project',
};

export const init = () => {
  ipcMain.handle(events.findAndOpenFile, openFileDialog);
  ipcMain.handle(events.saveProject, saveProject);
};

export default {
  events,
  init,
  openFileDialog,
};
