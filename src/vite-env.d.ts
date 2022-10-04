/// <reference types="vite/client" />

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

type AllowedEmitEventName = 'minimize-window' | 'close-window';
type AllowedOnEventName = 'protocol-params';

interface Window {
  electron: {
    emit: (eventName: AllowedEmitEventName, ...arg: any) => void;
    on: (
      eventName: AllowedOnEventName,
      listener: (...args: any[]) => void
    ) => void;
  };
}
