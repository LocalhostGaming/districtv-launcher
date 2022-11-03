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
}

enum AllowedEmitEvents {
  'minimize-window',
  'close-window',
  'discord-auth',
}

type AllowedEmitEventName = keyof typeof AllowedEmitEvents;
type AllowedOnEventName = keyof typeof AllowedOnEvents;

interface Window {
  electron: {
    emit: (eventName: AllowedEmitEventName, data?: any) => void;
    on: (
      eventName: AllowedOnEventName,
      listener: (...args: any[]) => void
    ) => void;
  };
}
