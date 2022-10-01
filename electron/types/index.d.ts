interface Window {
  electron: {
    emit: (channel: string, ...arg: any) => void;
    on: (channel: string, listener: (...args: any[]) => void) => void;
  };
}
