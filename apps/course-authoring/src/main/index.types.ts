declare global {
  interface Window {
    electronAPI: {
      ipcRenderer: {
        [key: string]: (...args: unknown[]) => void;
      };
    };
  }
}

export {};
