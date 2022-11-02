import { app, BrowserWindow, ipcMain, shell } from 'electron';
import isDev from 'electron-is-dev';
import path, { resolve } from 'path';
import { BASE_URL, PROTOCOL } from './constants';
import { getAllowedUrls } from './helpers';

const primaryInstance = app.requestSingleInstanceLock();

let mainWindow: BrowserWindow;

// Scheme must be registered before the app is ready
// protocol.registerSchemesAsPrivileged([
//   {
//     scheme: PROTOCOL,
//     privileges: { secure: true, standard: true, bypassCSP: true },
//   },
// ]);

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    title: 'District V Launcher',
    roundedCorners: true,
    width: 850,
    height: 647,
    fullscreen: false,
    frame: false,
    resizable: false,
    darkTheme: true,
    backgroundColor: '#2c2e33',
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js'),
    },
  });

  if (isDev) {
    mainWindow.loadURL(BASE_URL);

    // Open the DevTools.
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../index.html')}`);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

if (!primaryInstance) {
  app.quit();
}

app.on('second-instance', (_, urls) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }

  const allowedURLs = getAllowedUrls(urls);

  if (allowedURLs.length > 0) {
    mainWindow.webContents.send('protocol-params', allowedURLs);
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// remove so we can register each time as we run the app.
app.removeAsDefaultProtocolClient(PROTOCOL);

if (isDev && process.platform === 'win32') {
  // Set the path of electron.exe and your app.
  // These two additional parameters are only available on windows.
  // Setting this is required to get this working in dev mode.
  app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, [
    resolve(process.argv[1]),
  ]);
} else {
  app.setAsDefaultProtocolClient(PROTOCOL);
}

// Exit cleanly on request from parent process in development mode.
if (isDev) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

// EVENTS
ipcMain.on('minimize-window', () => {
  mainWindow.minimize();
});

ipcMain.on('close-window', () => {
  mainWindow.destroy();
});

ipcMain.on('discord-auth', (_, url) => {
  if (url) {
    shell.openExternal(url);
  }
});
