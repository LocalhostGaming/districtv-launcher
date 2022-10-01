import { app, BrowserWindow, protocol, ipcMain } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import isDev from 'electron-is-dev';
import path, { resolve } from 'path';

const baseURL = 'http://localhost:5173';
const protocolScheme = 'districtvlauncher';
const primaryInstance = app.requestSingleInstanceLock();

let mainWindow: BrowserWindow;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: { secure: true, standard: true, bypassCSP: true },
  },
]);

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
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js'),
    },
  });

  if (isDev) {
    try {
      await installExtension(REACT_DEVELOPER_TOOLS);
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error('React Devtools failed to install:', e?.toString());
    }

    mainWindow.loadURL(baseURL);

    // Open the DevTools.
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../index.html')}`);
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

if (!primaryInstance) {
  app.quit();
}

app.on('second-instance', (_, commandLine) => {
  // event, commandLine, workingDirectory
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }

  const url = commandLine.filter((value) => {
    const arr = value.split(':');
    let val = null;
    if (arr[0] === protocolScheme) {
      val = value;
    }
    return val;
  });

  if (url !== null) {
    mainWindow.webContents.send('protocol-params', url);
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
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
app.removeAsDefaultProtocolClient(protocolScheme);

if (isDev && process.platform === 'win32') {
  // Set the path of electron.exe and your app.
  // These two additional parameters are only available on windows.
  // Setting this is required to get this working in dev mode.
  app.setAsDefaultProtocolClient(protocolScheme, process.execPath, [
    resolve(process.argv[1]),
  ]);
} else {
  app.setAsDefaultProtocolClient(protocolScheme);
}

if (!app.isDefaultProtocolClient(protocolScheme)) {
  // Define custom protocol handler. Deep linking works on packaged versions of the application!
  app.setAsDefaultProtocolClient(protocolScheme);
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

// IPC EVENTS
ipcMain.on('minimize-window', () => {
  mainWindow.minimize();
});

ipcMain.on('close-window', () => {
  mainWindow.destroy();
});
