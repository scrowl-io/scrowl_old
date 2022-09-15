/* eslint-disable react-hooks/rules-of-hooks */
/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 */
import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  BrowserWindowConstructorOptions,
} from 'electron';
import electronDebug from 'electron-debug';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import { resolveHtmlPath } from './util';
import { init as initModels } from './models';
import { Menu, Publisher, Requester } from './services';

const __rootdir = path.join(__dirname, '../../');

let mainWindow: BrowserWindow | null = null;

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

const isDARWIN = process.platform === 'darwin';
let isQuitting = false;

const installExtensions = () => {
  return Promise.all([installExtension(REACT_DEVELOPER_TOOLS)]);
};

const createWindow = async () => {
  if (isDevelopment) {
    electronDebug();
    const installResult = await installExtensions();

    console.log(`\n\nAdded Extensions: ${installResult}\n\n`);
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__rootdir, 'dist', 'assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  function getBrowserWindow(preloadPath: string) {
    const browserWindowConfig: BrowserWindowConstructorOptions = {
      show: false,
      width: 1440,
      minWidth: 1024,
      height: 728,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        preload: preloadPath,
      },
    };

    try {
      return new BrowserWindow(browserWindowConfig);
    } catch (error) {
      console.error(preloadPath, '\n', error);
      return null;
    }
  }

  mainWindow = getBrowserWindow(path.join(__rootdir, 'dist', 'preload.js'));

  if (!mainWindow) {
    throw 'Unable to create Browser Window';
  }

  Publisher.init();
  await initModels();
  mainWindow.loadURL(resolveHtmlPath('renderer.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }

    if (isDevelopment) {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  });

  mainWindow.on('close', (ev: Electron.Event) => {
    try {
      if (process.platform === 'darwin') {
        if (isQuitting) {
          mainWindow = null;
        } else {
          ev.preventDefault();
          mainWindow?.hide();
        }
      }
    } catch (err) {
      console.error('window failed to closed', err);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  app.on('activate', () => {
    if (process.platform === 'darwin' && mainWindow !== null) {
      mainWindow.show();
    }
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler(edata => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

/**
 * Add event listeners...
 */

app.on('before-quit', () => {
  isQuitting = true;
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  try {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  } catch (err) {
    console.error('app failed to quit', err);
  }
});

const createApp = () => {
  app
    .whenReady()
    .then(() => {
      Menu.init(isDARWIN);
      Requester.init();
      Requester.useTemplateMiddleware();
      createWindow();

      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) createWindow();
      });
    })
    .catch(console.log);
};

const setDev = async () => {
  const utilDevPath = './util-dev.js';
  const util = await import(utilDevPath);

  util.updateDevEnv();
  createApp();
};

if (isDevelopment) {
  setDev();
} else {
  createApp();
}
