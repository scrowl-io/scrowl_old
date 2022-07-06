import { IpcMainInvokeEvent, Menu } from 'electron';
import { buildDefaultMenu } from './menu-template';

export const menuEvents = {
  toggleEnableItemById: 'menu-toggle-enable-item-by-id',
};

export const toggleEnableItemById = (
  event: IpcMainInvokeEvent,
  menuItemId: string
) => {
  const applicationMenu = Menu.getApplicationMenu();
  const disabledMenu = applicationMenu?.getMenuItemById(menuItemId);

  if (disabledMenu) disabledMenu.enabled = !disabledMenu.enabled;
};

export const init = () => {
  const menuTemplate = buildDefaultMenu();
  const menu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(menu);
};
