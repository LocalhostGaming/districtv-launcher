export interface ServerZodError {
  code: string;
  message: string;
  params: {
    code: string;
    isNestJsZod: boolean;
  };
  path: string[];
}
