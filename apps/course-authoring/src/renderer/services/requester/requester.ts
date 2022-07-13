export const invoke = (endpoint: string, ...args: unknown[]) => {
  return window.electronAPI.ipcRenderer.invoke(endpoint, ...args);
};

export const on = (
  endpoint: string,
  callback: (...args: unknown[]) => void
) => {
  window.electronAPI.ipcRenderer.on(endpoint, callback);
};

export const send = (endpoint: string, ...args: unknown[]) => {
  window.electronAPI.ipcRenderer.send(endpoint, ...args);
};

export const removeAllListeners = (channel: string) => {
  window.electronAPI.ipcRenderer.removeAllListeners(channel);
};
