import { RegisterEvent, ApiResult } from '../requester';

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

export interface ExporterEventPackage extends Omit<RegisterEvent, 'name'> {
  name: 'package-course';
}

export type ExporterEventNames = ExporterEventPackage['name'];

export type ExportEvent = ExporterEventPackage;

export type ExporterEvents = {
  package: ExporterEventPackage;
};

export type TemplateResult = ApiResult;
