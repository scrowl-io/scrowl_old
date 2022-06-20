import { ipcMain } from 'electron';
import { opanFileDialog } from './handlers';

export const events = {
  findAndOpenFile: 'find-and-open-file',
};

export const init = () => {
  ipcMain.handle(events.findAndOpenFile, opanFileDialog);
};

export default {
  events,
  init,
  opanFileDialog,
};
