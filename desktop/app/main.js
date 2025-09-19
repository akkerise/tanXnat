/* eslint-disable @typescript-eslint/no-var-requires */
// If run via Node (not Electron), re-spawn under Electron binary
if (!process.versions.electron) {
  const { spawn } = require('child_process');
  const electronBinary = require('electron'); // string path to electron binary
  spawn(electronBinary, [__filename], { stdio: 'inherit' });
  return;
}

const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

const isDev = process.env.VITE_DEV_SERVER === 'true';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    const indexHtml = path.join(__dirname, '..', 'dist', 'index.html');
    win.loadFile(indexHtml);
  }

  // Open links externally
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

