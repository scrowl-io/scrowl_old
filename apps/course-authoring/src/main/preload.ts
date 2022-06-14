import { contextBridge, ipcRenderer } from 'electron';
import { EVENTS as exporterEvents } from './services/exporter';
import { preferencesEvents } from './services/internal-storage';

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer: {
    invoke(channel: string, ...args: unknown[]) {
      const validChannels = [
        exporterEvents.package,
        preferencesEvents.getPreferencesList,
        preferencesEvents.getPreference,
        preferencesEvents.setPreferences,
      ];
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      }
    },
  },
});
