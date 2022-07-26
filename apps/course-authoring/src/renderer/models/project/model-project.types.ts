import { ProjectData, ProjectDataNew } from '../../../main/models/project';

export type ProjectObserverDataFn = React.Dispatch<
  ProjectData | ProjectDataNew
>;

export type ProjectObserverProcessFn = React.Dispatch<boolean>;

export type ProjectObserverImportFn = React.Dispatch<string>;
