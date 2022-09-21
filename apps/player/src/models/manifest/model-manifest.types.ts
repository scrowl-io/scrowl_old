import { ProjectData } from '../../../../authoring/src/main/models/projects/model-projects.types';

export {
  ProjectGlossaryItem,
  ProjectSlide,
  ProjectLesson,
  ProjectModule,
  ProjectData,
} from '../../../../authoring/src/main/models/projects/model-projects.types';

export {
  TemplateManifestElementText,
  TemplateManifestElementTextarea,
  TemplateManifestElementNumber,
  TemplateManifestElements,
  AspectRatios,
  TemplateManifestSlide,
  TemplateManifestMeta,
  TemplateManifest,
} from '../../../../authoring/src/main/models/templates/model-templates.types';

export interface GetResultSuccess {
  error: false;
  data: ProjectData;
}

export interface GetResultError {
  error: true;
  message: string;
}

export type GetResult = GetResultSuccess | GetResultError;
