import { ProjectData } from '../../../main/models/project';

export type ProjectObserverDataFn = React.Dispatch<ProjectData>;

export type ProjectObserverProcessFn = React.Dispatch<boolean>;

export type ProjectObserverImportFn = React.Dispatch<string>;
