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
}

export type OutlineProps = OutlineCommons;
