/* eslint-disable @typescript-eslint/no-unused-vars */
import { MenuItemConstructorOptions, KeyboardEvent } from 'electron';

const separator: MenuItemConstructorOptions = { type: 'separator' };

export const template: MenuItemConstructorOptions = {
  label: 'Edit',
  submenu: [
    {
      label: 'Copy',
      role: 'copy',
      accelerator: 'CmdOrCtrl+C',
    },
    {
      label: 'Paste',
      role: 'paste',
      accelerator: 'CmdOrCtrl+V',
    },
    {
      label: 'Undo',
      role: 'undo',
      accelerator: 'CmdOrCtrl+Z',
    },
    {
      label: 'Redo',
      role: 'redo',
      accelerator: 'CmdOrCtrl+Y',
    },
  ],
};

export default {
  template,
};
