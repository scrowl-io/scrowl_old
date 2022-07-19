import { IpcMainInvokeEvent, Menu } from 'electron';
import { MenuItemEvent, MenuEventsGlobal, MenuItems } from './service-menu.types';
import { ApiResult } from '../requester';

const itemListHandler = (event: IpcMainInvokeEvent) => {
  return new Promise<ApiResult>(resolve => {

    if (!Object.keys(ITEMS).length) {
      resolve({
        error: true,
        message: 'Menu has not been initialized'
      });
      return;
    }

    resolve({
      error: false,
      data: {
        items: ITEMS
      }
    });
  });
}

const itemToggleHandler = (
  event: IpcMainInvokeEvent,
  item: MenuItemEvent
) => {
  return new Promise<ApiResult>(resolve => {

    if (!item) {
      resolve({
        error: true,
        message: `Unable to toggle item - No item`
      });
      return;
    }

    const appMenu = Menu.getApplicationMenu();

    if (!appMenu) {
      resolve({
        error: true,
        message: `Unable to toggle item: ${item.name} - Menu not initialized`
      })
      return;
    }

    const menuItem = appMenu.getMenuItemById(item.id);
    
    if (!menuItem) {
      resolve({
        error: true,
        message: `Unable to toggle item: ${item.name} - Item not found`
      });
      return;
    }

    menuItem.enabled = !menuItem.enabled;

    resolve({
      error: false,
      data: {
        item,
        enabled: menuItem.enabled
      }
    })
  });
};

const itemDisableHandler = (
  event: IpcMainInvokeEvent,
  item: MenuItemEvent
) => {
  return new Promise<ApiResult>(resolve => {
    if (!item) {
      resolve({
        error: true,
        message: `Unable to disable item - No item`
      });
      return;
    }

    const appMenu = Menu.getApplicationMenu();

    if (!appMenu) {
      resolve({
        error: true,
        message: `Unable to disable item: ${item.name} - Menu not initialized`
      })
      return;
    }

    const menuItem = appMenu.getMenuItemById(item.id);
    
    if (!menuItem) {
      resolve({
        error: true,
        message: `Unable to disable item: ${item.name} - Item not found`
      });
      return;
    }

    //TODO disable item here

    resolve({
      error: false,
      data: {
        item,
      }
    })
  });
}

export const EVENTS:MenuEventsGlobal = {
  itemList: {
    id: 'item-list',
    name: 'menu/items',
    type: 'invoke',
    fn: itemListHandler,
  },
  itemToggle: {
    id: 'item-toggle',
    name: 'menu/item/toggle',
    type: 'on',
    fn: itemToggleHandler,
  },
  itemDisable: {
    id: 'item-disable',
    name: 'menu/item/disable',
    type: 'on',
    fn: itemDisableHandler,
  },
};

export let ITEMS: MenuItems = {};

export const init = (items: MenuItems) => {
  ITEMS = items;
};

export default {
  EVENTS,
  ITEMS,
  init,
};
