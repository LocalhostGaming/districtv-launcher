import { AllowedEmitEvents, AllowedOnEvents } from '../enums';

export const PROTOCOL = 'districtvlauncher';
export const BASE_URL = 'http://localhost:5173';

export const ALLOWED_HOST = Object.entries(AllowedOnEvents).map(([key]) =>
  key.toString()
);

export const ALLOWED_EMIT_EVENT_NAME = Object.entries(AllowedEmitEvents).map(
  ([key]) => key.toString()
);
export const ALLOWED_ON_EVENT_NAME = Object.entries(AllowedOnEvents).map(
  ([key]) => key.toString()
);
