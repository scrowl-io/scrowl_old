import { contextBridge, ipcRenderer } from 'electron';
import { EVENTS as exporterEvents } from './services/exporter';
import { preferencesEvents } from './services/internal-storage';
import { getEvents as getModelEvents } from './models/index';

const validChannels = [
  exporterEvents.package,
  preferencesEvents.getPreferencesList,
  preferencesEvents.getPreference,
  preferencesEvents.setPreferences,
].concat(getModelEvents());

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer: {
    invoke(channel: string, ...args: unknown[]) {
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      }
    },
  },
});
