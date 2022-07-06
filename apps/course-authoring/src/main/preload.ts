import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { EVENTS as exporterEvents } from './services/exporter';
import { preferencesEvents } from './services/internal-storage';
import { menuEvents } from './menu';
import { getEvents as getModelEvents } from './models/index';

const validChannels = [
  exporterEvents.package,
  preferencesEvents.getPreferencesList,
  preferencesEvents.getPreference,
  preferencesEvents.setPreferences,
  menuEvents.toggleEnableItemById,
].concat(getModelEvents());

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer: {
    invoke(channel: string, ...args: unknown[]) {
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      }
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      if (validChannels.includes(channel)) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
          func(...args);

        ipcRenderer.on(channel, subscription);

        return () => ipcRenderer.removeListener(channel, subscription);
      }

      return undefined;
    },
  },
});
