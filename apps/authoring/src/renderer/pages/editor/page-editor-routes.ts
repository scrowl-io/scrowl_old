import { PageRoutesProps, PageNavProps } from '..';
import { PageRoutes as HomeRoutes } from '../home'

export const PageRoutes: PageRoutesProps = {
  base: {
    url: '/editor',
    label: 'Editor'
  }
};

export const PageNavItems: PageNavProps = [
  HomeRoutes.base,
];

export default {
  PageRoutes,
  PageNavItems,
};
