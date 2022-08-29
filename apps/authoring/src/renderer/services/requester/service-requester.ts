import { Listener } from './service-requester.types';

export const invoke = (endpoint: string, ...args: unknown[]) => {
  return window.electronAPI.ipcRenderer.invoke(endpoint, ...args);
};

export const on = (endpoint: string, listener: Listener) => {
  window.electronAPI.ipcRenderer.on(endpoint, listener);
};

export const send = (endpoint: string, ...args: unknown[]) => {
  window.electronAPI.ipcRenderer.send(endpoint, ...args);
};

export const off = (endpoint: string, listener: Listener) => {
  window.electronAPI.ipcRenderer.removeListener(endpoint, listener);
};

export const offAll = (endpoint: string) => {
  window.electronAPI.ipcRenderer.removeAllListeners(endpoint);
};
