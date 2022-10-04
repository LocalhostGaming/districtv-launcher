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
