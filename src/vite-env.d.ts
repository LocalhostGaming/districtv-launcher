/// <reference types="vite/client" />

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

enum AllowedOnEvents {
  'discord',
  'getConfig:value',
}

enum AllowedEmitEvents {
  'minimize-window',
  'close-window',
  'discord-auth',
  'setConfig',
  'getConfig',
  'deleteConfig',
  'clearConfig',
}

type AllowedEmitEventName = keyof typeof AllowedEmitEvents;
type AllowedOnEventName = keyof typeof AllowedOnEvents;

export {};
declare global {
  interface Window {
    electron: {
      emit: (eventName: AllowedEmitEventName, data?: any) => void;
      on: (
        eventName: AllowedOnEventName,
        listener: (...args: any[]) => void
      ) => void;
      removeAllListeners: (eventName: string) => void;
      removeListener: (
        eventName: string,
        func: (...args: any[]) => void
      ) => void;
    };
    storage: {
      get: (key: string) => any;
      set: (key: string, value: any) => void;
      delete: (key: string) => void;
      clear: () => void;
    };
  }
}
