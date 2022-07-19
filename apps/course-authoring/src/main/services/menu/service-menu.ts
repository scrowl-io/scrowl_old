import { Menu } from 'electron';
import { MenuEvents } from './service-menu.types';
import { RegisterEventType } from '../requester'
import {
    EVENTS as globalEvents,
    init as globalInit,
} from './service-menu-globals';
import { createMenu } from './templates';

export let EVENTS:MenuEvents = globalEvents;

export const init = (isMacOs: boolean) => {
  const menuConfig = createMenu(isMacOs);
  const menu = Menu.buildFromTemplate(menuConfig.template);
  const items = Object.assign({}, menuConfig.EVENTS);

  EVENTS = Object.assign(EVENTS, menuConfig.EVENTS);
  globalInit(items);
  Menu.setApplicationMenu(menu);
};

export const getEvents = (
  type?: RegisterEventType
) => {
  const eventList: Array<string> = [];

  for (const [key, event] of Object.entries(EVENTS)) {

    if (!type || event.type === type) {
      eventList.push(event.name);
    }
  }

  return eventList;
}

export default {
  EVENTS,
  init,
  getEvents,
};
