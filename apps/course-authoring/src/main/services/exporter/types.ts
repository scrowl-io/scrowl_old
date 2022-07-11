interface PathingFiles {
  template: {
    source: string;
    dest: string;
  };
}

export type PathingFileKey = keyof PathingFiles;

interface PathingDirs {
  source: string;
  out: string;
}

export type PathingDirKey = keyof PathingDirs;
export interface PathingProps {
  files: PathingFiles;
  dirs: PathingDirs
}

export type TemplateData = {
  [key: string]: string | number;
}

export interface TEMPLATE_RESULT_SUCCESS {
  error: false;
  data: string;
}

export interface TEMPLATE_RESULT_ERROR {
  error: true;
  message: any;
}

export type TemplateResult = TEMPLATE_RESULT_SUCCESS | TEMPLATE_RESULT_ERROR;