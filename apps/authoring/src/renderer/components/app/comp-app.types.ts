import { PageRoutesProps, PageNavProps } from '../../pages';

export interface AppPageProps {
  PageRoutes: PageRoutesProps;
  PageNavItems: PageNavProps;
  PageElement: () => JSX.Element;
}

export type AppPages = Array<AppPageProps>;
