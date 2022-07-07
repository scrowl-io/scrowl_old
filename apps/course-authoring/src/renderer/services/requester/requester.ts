export const invoke = (endpoint: string, ...args: unknown[]) => {
  return window.electronAPI.ipcRenderer.invoke(endpoint, ...args);
};

export const on = (
  endpoint: string,
  callback: (...args: unknown[]) => void
) => {
  return window.electronAPI.ipcRenderer.on(endpoint, callback);
};

export const send = (endpoint: string, ...args: unknown[]) => {
  return window.electronAPI.ipcRenderer.send(endpoint, ...args);
};

export const removeAllListeners = (channel: string) => {
  return window.electronAPI.ipcRenderer.removeAllListeners(channel);
};
