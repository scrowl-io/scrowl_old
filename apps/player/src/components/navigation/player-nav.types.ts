import { Pages } from '../../models';

export type NavConfig = Array<Pages.PageDefinition>;

export type ModuleConfigDict = {
  [key: string]: Array<Pages.PageDefinition>;
};

export type ModuleConfigListItem = {
  name: string;
  lessons: Array<Pages.PageDefinition>;
};

export type ModuleConfigList = Array<ModuleConfigListItem>;

export interface NavCommons {
  config: NavConfig;
}

export type NavProps = NavCommons;
