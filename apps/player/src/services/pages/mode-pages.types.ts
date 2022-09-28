import { TemplateList } from '../../components/app/player-app.types';

export interface PageCommons {
  templateList?: TemplateList;
}

export type PageProps = PageCommons;

export interface PageDefinition {
  moduleId: number;
  moduleName: string;
  id: number;
  name: string;
  url: string;
  Element: (props: PageProps) => JSX.Element;
}

export interface GetResultSuccess {
  error: false;
  data: Array<PageDefinition>;
}

export interface GetResultError {
  error: true;
  message: string;
}

export type GetResult = GetResultSuccess | GetResultError;

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
export interface TemplateCommons {
  manifest: TemplateManifestElements;
}

export type TemplateProps = TemplateCommons;

export type TemplateElement = (props: TemplateProps) => JSX.Element;
