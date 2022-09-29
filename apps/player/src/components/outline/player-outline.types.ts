import { Pages } from '../../services';

export type NavConfig = Array<Pages.PageDefinition>;

export type ModuleConfigDict = {
  [key: string]: Array<Pages.PageDefinition>;
};

export type ModuleConfigListItem = {
  name: string;
  lessons: Array<Pages.PageDefinition>;
};

export type ModuleConfigList = Array<ModuleConfigListItem>;

export interface OutlineNavLessonCommons {
  config: Pages.PageDefinition;
  moduleIdx: number;
  idx: number;
}

export type OutlineNavLessonProps = OutlineNavLessonCommons &
  React.HTMLAttributes<HTMLDivElement>;

export interface OutlineNavLessonsCommons {
  config: Array<Pages.PageDefinition>;
  moduleIdx: number;
}

export type OutlineNavLessonsProps = OutlineNavLessonsCommons &
  React.HTMLAttributes<HTMLDivElement>;

export interface OutlineNavModuleCommons {
  config: ModuleConfigListItem;
  idx: number;
}

export type OutlineNavModuleProps = OutlineNavModuleCommons &
  React.HTMLAttributes<HTMLDivElement>;

export interface OutlineTabNavCommons {
  config: ModuleConfigList;
}

export type OutlineTabNavProps = OutlineTabNavCommons;

export interface OutlineCommons {
  config: NavConfig;
  glossary: any;
}

export type OutlineProps = OutlineCommons;

export type GlossaryItem = { name: string; description: string };
export type GlossaryData = Array<GlossaryItem>;

export type GlossaryDictTerm = {
  idx: number;
  description: string;
};

export type GlossaryDictEntries = {
  [term: string]: GlossaryDictTerm;
};

export type GlossaryDict = {
  [heading: string]: GlossaryDictEntries;
};

export type GlossaryListProps = {
  glossary: any;
};
