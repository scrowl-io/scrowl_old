import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { EVENTS as exporterEvents } from './services/exporter';
import { preferencesEvents } from './services/internal-storage';
import { getEvents as getModelEvents } from './models/index';

const validInvokeChannels = [
  exporterEvents.package,
  preferencesEvents.getPreferencesList,
  preferencesEvents.getPreference,
  preferencesEvents.setPreferences,
  getModelEvents('invoke'),
].flat();

const validOnChannels = getModelEvents('on');

console.log(validOnChannels);

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer: {
    invoke(channel: string, ...args: unknown[]) {
      if (validInvokeChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      }
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      if (validOnChannels.includes(channel)) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => {
          func(...args);
        };

        ipcRenderer.on(channel, subscription);

        return () => ipcRenderer.removeListener(channel, subscription);
      }

      return undefined;
    },
    removeAllListeners(channel: string) {
      // same valid channels from "on" registerd because the same
      // channels which can be registered can also be removed
      if (validOnChannels.includes(channel)) {
        ipcRenderer.removeAllListeners(channel);
      }
    },
  },
});
