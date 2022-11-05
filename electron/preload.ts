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
    if (!ALLOWED_ON_EVENT_NAME.includes(eventName))
      throw new Error('Invalid event name');

    return ipcRenderer.on(eventName, (_, ...args) => func(...args));
  },
  removeListener: (eventName: string, func: (...args: any[]) => void) => {
    ipcRenderer.removeListener(eventName, func);
  },
  removeAllListeners: (eventName: string) => {
    ipcRenderer.removeAllListeners(eventName);
  },
  storage: {
    get: async (key: string) => {
      const result = await ipcRenderer.invoke('storage:get', key);

      return result;
    },
    set: (key: string, value: any) => {
      ipcRenderer.send('storage:set', key, value);
    },
    delete: (key: string) => {
      ipcRenderer.send('storage:delete', key);
    },
    clear: () => {
      ipcRenderer.send('storage:clear');
    },
  },
});
