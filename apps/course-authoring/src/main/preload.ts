import { contextBridge, ipcRenderer } from 'electron';
import { EVENTS as exporterEvents } from './services/exporter';
import { preferencesEvents } from './services/internal-storage';
import { fileSystemEvents } from './services/file-system';

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer: {
    invoke(channel: string, ...args: unknown[]) {
      const validChannels = [
        exporterEvents.package,
        preferencesEvents.getPreferencesList,
        preferencesEvents.getPreference,
        preferencesEvents.setPreferences,
        fileSystemEvents.importFile,
        fileSystemEvents.saveProject,
        fileSystemEvents.newProject,
      ];
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      }
    },
  },
});
