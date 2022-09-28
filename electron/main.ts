import { app, BrowserWindow, protocol } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';

const baseURL = 'http://localhost:5173';
const protocolScheme = 'districtvlauncher';
const primaryInstance = app.requestSingleInstanceLock();

let mainWindow: BrowserWindow;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: protocolScheme, privileges: { secure: true, standard: true } },
]);

const createWindow = () => {
  mainWindow = new BrowserWindow({
    title: 'District V Launcher',
    hasShadow: true,
    roundedCorners: true,
    width: 850,
    height: 647,
    useContentSize: true,
    fullscreen: false,
    frame: false,
    resizable: false,
    transparent: true,
    darkTheme: true,
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    isDev ? baseURL : `file://${path.join(__dirname, '../dist/index.html')}`
  );

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
};

if (!primaryInstance) {
  app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

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
    if (arr[0] === 'districtvlauncher') {
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

// If we are running a non-packaged version of the app && on windows
if (isDev) {
  // Set the path of electron.exe and your app.
  // These two additional parameters are only available on windows.
  app.setAsDefaultProtocolClient(protocolScheme, process.execPath, [
    path.resolve(process.argv[1]),
  ]);
} else {
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
