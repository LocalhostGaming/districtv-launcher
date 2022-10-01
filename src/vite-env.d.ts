/// <reference types="vite/client" />

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

interface Window {
  electron: {
    emit: (channel: string, ...arg: any) => void;
    on: (channel: string, listener: (...args: any[]) => void) => void;
  };
}
