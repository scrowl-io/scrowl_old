import { IpcMainInvokeEvent, Menu } from 'electron';
import { MenuItemIds, MenuEvents } from './service-menu-types';

const toggleItemHandler = (
  event: IpcMainInvokeEvent,
  id: MenuItemIds
) => {
  const applicationMenu = Menu.getApplicationMenu();
  const disabledMenu = applicationMenu?.getMenuItemById(id);

  if (disabledMenu) disabledMenu.enabled = !disabledMenu.enabled;
};

export const events:MenuEvents = [
  {
    name: 'menu/toggle-item',
    type: 'on',
    fn: toggleItemHandler,
  }
]

export default {
  events,
};
