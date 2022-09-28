declare global {
  interface Window {
    __SCROWL_MANIFEST: ProjectData;
  }
}

export type AspectRatios = {
  '4:3': {
    label: 'Standard 4:3';
    width: 1920;
    height: 1440;
  };
  '16:9': {
    label: 'Widescreen 16:9';
    width: 1920;
    height: 1080;
  };
  '16:10': {
    label: 'Widescreen 16:10';
    width: 1920;
    height: 1200;
  };
};

export type TemplateManifestSlide = {
  aspect: keyof AspectRatios;
};

export type TemplateManifestElementText = {
  value: string;
  type: 'text';
  label: string;
};

export type TemplateManifestElementTextarea = {
  value: string;
  type: 'textarea';
  label: string;
};

export type TemplateManifestElementNumber = {
  value: number;
  type: 'number';
  label: string;
};

export type ManifestElementListText = {
  value: Array<string>;
  type: 'listText';
  label: string;
};

export type TemplateManifestElements = {
  [key: string]:
    | TemplateManifestElementText
    | TemplateManifestElementNumber
    | TemplateManifestElementTextarea
    | ManifestElementListText;
};

export interface TemplateManifestMeta {
  name: string;
  filename: string;
  component: string;
}

export interface TemplateManifest {
  version?: string;
  meta: TemplateManifestMeta;
  slide: TemplateManifestSlide;
  elements: TemplateManifestElements;
}

export type ProjectSlide = {
  id?: number;
  lessonID?: number;
  moduleID?: number;
  name: string;
  template?: TemplateManifest;
};

export type ProjectLesson = {
  id?: number;
  moduleID?: number;
  name: string;
  slides: Array<ProjectSlide>;
};

export type ProjectModule = {
  id?: number;
  name: string;
  lessons: Array<ProjectLesson>;
};

export type ProjectGlossaryItem = {
  name: string;
  description: string;
};
export interface ProjectData {
  id: string;
  name: string;
  description?: string;
  scormConfig: {
    name?: string;
    description?: string;
    authors?: string;
  };
  glossary?: Array<ProjectGlossaryItem>;
  modules?: Array<ProjectModule>;
}

export interface GetResultSuccess {
  error: false;
  data: ProjectData;
}

export interface GetResultError {
  error: true;
  message: string;
}

export type GetResult = GetResultSuccess | GetResultError;
