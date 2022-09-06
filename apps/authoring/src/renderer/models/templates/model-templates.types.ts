import { TemplateData } from '../../../main/models/templates';

export type { TemplateData } from '../../../main/models/templates';

export type TemplateObserverDataFn = React.Dispatch<TemplateData>;

export type TemplateObserverProcessFn = React.Dispatch<boolean>;

export type TemplateObserverImportFn = React.Dispatch<string>;

export type TemplateInitialState = {
  data: TemplateData;
  isProcessing: boolean;
  isInit: boolean;
  isExploring: boolean;
};
