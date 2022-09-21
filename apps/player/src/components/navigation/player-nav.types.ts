import { Pages } from '../../models';

export interface NavCommons {
  config: Array<Pages.PageDefinition>;
}

export type NavProps = NavCommons;
