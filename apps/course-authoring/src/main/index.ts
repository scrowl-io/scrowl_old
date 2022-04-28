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
  ipcMain,
  BrowserWindowConstructorOptions,
} from 'electron';
import electronReload from 'electron-reload';
import buildPackage from '@liascript/simple-scorm-packager';
import electronDebug from 'electron-debug';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import { resolveHtmlPath } from './util';

const __rootdir = path.join(__dirname, '../../');

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.handle('start-scorm-export-process', (_event, args) => {
  buildPackage({
    version: '1.2',
    organization: 'The Test Company',
    title: `${args?.courseName ?? ''}`,
    language: 'en-ca',
    identifier: '00',
    masteryScore: 80,
    startingPage: '/res/start.html',
    source: './src/scormBuild',
    package: {
      version: '0.0.1',
      zip: true,
      outputFolder: './src/scormPackages',
    },
  });

  return `SCORM package of ${args} exported successfully!`;
});

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  electronDebug();

  try {
    electronReload(__rootdir, {});
  } catch (err) {
    console.error(err);
  }
}

const installExtensions = () => {
  return Promise.all([installExtension(REACT_DEVELOPER_TOOLS)]);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions().then(installs => {
      console.log(`Added Extensions: ${installs}`);
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
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
