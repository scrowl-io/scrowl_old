import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { RegisterEventType, RegisterEvent } from './services/requester';

let eventList: Array<RegisterEvent> = [];

const updateEventList = async ():Promise<{
  events: RegisterEvent[]
}>  => {
  const result = await ipcRenderer.invoke('events-all');

  if (!result.error) {
    eventList = result.data.events;
  }

  return {
    events: eventList
  };
};

const getValidEvents = async (type?: RegisterEventType) => {
  const { events } = await updateEventList();
  
  return events
    .filter((event: RegisterEvent) => {
      return (!type || type === event.type);
    })
    .map((event: RegisterEvent) => {
      return event.name;
    });
}

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer: {
    async invoke(endpoint: string, ...args: unknown[]) {
      // sends an 'invoke' event to the backend
      const validEvents = await getValidEvents('invoke');

      if (validEvents.indexOf(endpoint) !== -1) {
        return ipcRenderer.invoke(endpoint, ...args);
      }
    },
    async on(endpoint: string, listener: (...args: unknown[]) => void) {
      // listens to a 'send' event from the backend
      const validEvents = await getValidEvents('send');

      if (validEvents.indexOf(endpoint) !== -1) {
        ipcRenderer.on(endpoint, listener);
      }
    },
    async send(endpoint: string, ...args: unknown[]) {
      // sends an 'on' event to the backend
      const validEvents = await getValidEvents('on');

      if (validEvents.indexOf(endpoint) !== -1) {
        ipcRenderer.send(endpoint, ...args);
      }
    },
    async removeAllListeners(endpoint: string) {
      // removes all callbacks from an endpoint
      // DANGREROUS //
      const validEvents = await getValidEvents();
      
      if (validEvents.indexOf(endpoint) !== -1) {
        ipcRenderer.removeAllListeners(endpoint);
      }
    },
  },
});
