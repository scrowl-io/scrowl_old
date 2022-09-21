export interface PageDefinition {
  moduleId: number;
  moduleName: string;
  id: number;
  name: string;
  url: string;
  Element: () => JSX.Element;
}

export interface GetResultSuccess {
  error: false;
  data: Array<PageDefinition>;
}

export interface GetResultError {
  error: true;
  message: string;
}

export type GetResult = GetResultSuccess | GetResultError;
