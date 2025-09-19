// Minimal preload for future IPC use
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('env', {
  isDesktop: true,
});

