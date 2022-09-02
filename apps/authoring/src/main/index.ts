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
  protocol,
} from 'electron';
import electronDebug from 'electron-debug';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import { resolveHtmlPath } from './util';
import { init as initModels } from './models';
import { Menu, Publisher, Requester } from './services';

const __rootdir = path.join(__dirname, '../../');

let mainWindow: BrowserWindow | undefined;

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

const isDARWIN = process.platform === 'darwin';

const installExtensions = () => {
  return Promise.all([installExtension(REACT_DEVELOPER_TOOLS)]);
};

const createWindow = (modal?: boolean, parent?: BrowserWindow) => {
  if (isDevelopment) {
    electronDebug();
    installExtensions().then(result => {
      console.log(`\n\nAdded Extensions: ${result}\n\n`);
    });
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
      width: 1024,
      minWidth: 1024,
      height: 728,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        preload: preloadPath,
      },
    };

    if (modal && parent) {
      browserWindowConfig.modal = modal;
      browserWindowConfig.parent = parent;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      browserWindowConfig.webPreferences!.preload = '';
    }

    try {
      return new BrowserWindow(browserWindowConfig);
    } catch (error) {
      console.error(preloadPath, '\n', error);
      return undefined;
    }
  }

  mainWindow = getBrowserWindow(path.join(__rootdir, 'dist', 'preload.js'));

  if (!mainWindow) {
    throw 'Unable to create Browser Window';
  }

  Publisher.init();
  initModels();
  mainWindow.loadURL(resolveHtmlPath('renderer.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler(edata => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  return;
};

/**
 * Register a custom protocol to load files from local disk
 * Using the protocol will avoid the Chromium security error: " Not allowed to load local resource"
 * due to the webPreferences: { webSecurity: true } when creating the window.
 * More info: https://github.com/electron/electron/issues/23757#issuecomment-640146333
 * Do not disable websecurity: https://www.electronjs.org/docs/latest/tutorial/security#6-do-not-disable-websecurity
 *
 * Using the custom protocol:
 * <img src='scrowl-file:///User/Images/img.jpeg' />
 */
const registerScrowlFileProtocol = () => {
  const protocolName = 'scrowl-file';

  protocol.registerFileProtocol(protocolName, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, '');
    try {
      return callback(decodeURIComponent(url));
    } catch (error) {
      console.error(error);
    }
  });
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const createApp = () => {
  app
    .whenReady()
    .then(() => {
      registerScrowlFileProtocol();
      Menu.init(isDARWIN);
      Requester.init();
      createWindow();

      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) createWindow();
      });
    })
    .catch(console.log);
};

export const createPreviewWindow = () => {
  const previewWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 1024,
    minWidth: 1024,
    height: 728,
  });

  previewWindow?.loadURL('https://github.com');

  previewWindow?.once('ready-to-show', () => {
    previewWindow?.show();
  });
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
