import { ServerZodError } from '@interface/errors';

export const parseServerZodErrors = (errors?: ServerZodError[]) => {
  if (!errors || errors.length <= 0) return undefined;

  const errorsObj: { [key: string]: string } = {};

  errors.forEach((err) => {
    const key = err.path.join('.') as keyof typeof errorsObj;
    errorsObj[key] = err.message;
  });

  return errorsObj;
};
