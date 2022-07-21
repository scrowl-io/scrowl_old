import { IpcMainInvokeEvent, Menu } from 'electron';
import { MenuItemEvent, MenuEventsGlobal, MenuItems } from './service-menu.types';
import { ApiResult, registerAll } from '../requester';

const itemListHandler = (event: IpcMainInvokeEvent) => {
  return new Promise<ApiResult>(resolve => {
    resolve({
      error: false,
      data: {
        items: JSON.parse(JSON.stringify(ITEMS))
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

    menuItem.enabled = false;

    resolve({
      error: false,
      data: {
        item,
        enabled: menuItem.enabled
      }
    })
  });
}

const itemEnableHandler = (
  event: IpcMainInvokeEvent,
  item: MenuItemEvent
) => {
  return new Promise<ApiResult>(resolve => {
    if (!item) {
      resolve({
        error: true,
        message: `Unable to enable item - No item`
      });
      return;
    }

    const appMenu = Menu.getApplicationMenu();

    if (!appMenu) {
      resolve({
        error: true,
        message: `Unable to enable item: ${item.name} - Menu not initialized`
      })
      return;
    }

    const menuItem = appMenu.getMenuItemById(item.id);
    
    if (!menuItem) {
      resolve({
        error: true,
        message: `Unable to enable item: ${item.name} - Item not found`
      });
      return;
    }

    menuItem.enabled = true;

    resolve({
      error: false,
      data: {
        item,
        enabled: menuItem.enabled
      }
    })
  });
};

export const EVENTS:MenuEventsGlobal = {
  itemList: {
    name: 'menu/items',
    type: 'invoke',
    fn: itemListHandler,
  },
  itemToggle: {
    name: 'menu/item/toggle',
    type: 'invoke',
    fn: itemToggleHandler,
  },
  itemDisable: {
    name: 'menu/item/disable',
    type: 'invoke',
    fn: itemDisableHandler,
  },
  itemEnable: {
    name: 'menu/item/enable',
    type: 'invoke',
    fn: itemEnableHandler,
  }
};

export let ITEMS: MenuItems = {};

export const init = (items: MenuItems) => {
  registerAll(EVENTS);
  ITEMS = items;
};

export default {
  EVENTS,
  ITEMS,
  init,
};
