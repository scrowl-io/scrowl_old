import { ipcMain } from 'electron';
import { newProject, importFile, saveProject } from './models';

const events = {
  importFile: 'import-file',
  saveProject: 'save-project',
  newProject: 'new-project',
};

const init = () => {
  ipcMain.handle(events.importFile, importFile);
  ipcMain.handle(events.saveProject, saveProject);
  ipcMain.handle(events.newProject, newProject);
};

export const fileSystemEvents = events;
export const fileSystemInit = init;

export default { fileSystemEvents, fileSystemInit };
