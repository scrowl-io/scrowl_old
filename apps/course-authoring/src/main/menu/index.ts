import { IpcMainInvokeEvent, Menu } from 'electron';
import { buildDefaultMenu } from './menu-template';

export const disableMenuItemById = (
  event: IpcMainInvokeEvent,
  menuItemId: string,
  menuItemStatus: boolean
) => {
  const applicationMenu = Menu.getApplicationMenu();
  const disabledMenu = applicationMenu?.getMenuItemById(menuItemId);

  if (disabledMenu) disabledMenu.enabled = menuItemStatus;
};

export const init = () => {
  const menuTemplate = buildDefaultMenu();
  const menu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(menu);
};
