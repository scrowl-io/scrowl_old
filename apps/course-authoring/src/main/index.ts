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
import { init as exporterInit } from './services/exporter';
import { preferencesInit } from './services/internal-storage';
import { init as modelsInit } from './models/index';
import { initMenu } from './models/menu/menu-models';

const __rootdir = path.join(__dirname, '../../');

let mainWindow: BrowserWindow | null = null;

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

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
      titleBarStyle: 'hidden',
      show: false,
      width: 1024,
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

  exporterInit();
  preferencesInit();
  modelsInit();

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
    mainWindow = null;
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler(edata => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
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

app
  .whenReady()
  .then(() => {
    registerScrowlFileProtocol();
    createWindow();
    initMenu();

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
