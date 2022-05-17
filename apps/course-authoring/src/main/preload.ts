import { contextBridge, ipcRenderer } from 'electron';
import { EVENTS as exporterEvents } from './services/exporter';

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer: {
    invoke(channel: string, ...args: unknown[]) {
      const validChannels = [exporterEvents.package];
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      }
    },
  },
});
