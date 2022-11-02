type AllowedEmitEventName = 'minimize-window' | 'close-window' | 'discord-auth';
type AllowedOnEventName = 'protocol-params';

interface Window {
  electron: {
    emit: (eventName: AllowedEmitEventName, data?: any) => void;
    on: (
      eventName: AllowedOnEventName,
      listener: (...args: any[]) => void
    ) => void;
  };
}
