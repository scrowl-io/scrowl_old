/* eslint-disable @typescript-eslint/no-unused-vars */
import { MenuItemConstructorOptions, KeyboardEvent } from 'electron';

const separator: MenuItemConstructorOptions = { type: 'separator' };

export const template: any = {
  label: 'Edit',
  submenu: [
    {
      label: 'Copy',
      selector: 'copy:',
      accelerator: 'CmdOrCtrl+C',
    },
    {
      label: 'Paste',
      selector: 'paste:',
      accelerator: 'CmdOrCtrl+V',
    },
  ],
};

export default {
  template,
};
