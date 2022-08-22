import { TemplateData } from '../../../main/models/templates';

export type { TemplateData } from '../../../main/models/templates';

export type TemplateObserverDataFn = React.Dispatch<TemplateData>;

export type TemplateObserverProcessFn = React.Dispatch<boolean>;

export type TemplateObserverImportFn = React.Dispatch<string>;
