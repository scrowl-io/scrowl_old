export const send = (endpoint: string, ...args: unknown[]) => {
  return window.electronAPI.ipcRenderer.invoke(endpoint, ...args);
};

export default {
  send,
};
