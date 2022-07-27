import { PageNavProps } from '../../../pages';

export interface TitleBarCommons {
  routes: PageNavProps;
}

export type TitleBarProps = Partial<TitleBarCommons>;
