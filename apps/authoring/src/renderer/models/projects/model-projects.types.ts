import { ProjectData } from '../../../main/models/projects';

export type {
  ProjectData,
  ProjectModule,
  ProjectLesson,
  ProjectSlide,
} from '../../../main/models/projects';

export type ProjectInitialState = {
  data: ProjectData;
  isProcessing: boolean;
  isInit: boolean;
  isExploring: boolean;
  isLoaded: boolean;
  isMenuReady: boolean;
};
