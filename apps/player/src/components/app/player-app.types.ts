import { ProjectConfig } from '../project/project.types';

export interface Manifest {
  error: boolean;
  message: string;
  data?: ProjectConfig;
}
