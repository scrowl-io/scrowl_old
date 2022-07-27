import createIPCMock from 'electron-mock-ipc';

const service = createIPCMock();

export const ipcMain = service.ipcMain;
export const ipcRenderer = service.ipcRenderer;

export default {
  ipcMain,
  ipcRenderer,
};
