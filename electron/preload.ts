import { contextBridge, ipcRenderer } from 'electron';
import { ALLOWED_EMIT_EVENT_NAME, ALLOWED_ON_EVENT_NAME } from './constants';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  emit: (eventName: string, data: any) => {
    // whitelist channels
    if (ALLOWED_EMIT_EVENT_NAME.includes(eventName)) {
      ipcRenderer.send(eventName, data);
    }
  },
  on: (eventName: string, func: (...args: any[]) => void) => {
    if (ALLOWED_ON_EVENT_NAME.includes(eventName)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(eventName, (_, ...args) => func(...args));
    }
  },
});
