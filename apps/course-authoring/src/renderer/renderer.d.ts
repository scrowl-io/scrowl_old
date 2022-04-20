declare module '@liascript/simple-scorm-packager';

export interface IElectronAPI {
  ipcRenderer: {
    [key: string]: (...args: unknown[]) => void;
  };
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
