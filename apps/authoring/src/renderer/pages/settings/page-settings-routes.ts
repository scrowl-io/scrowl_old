import { PageRoutesProps, PageNavProps } from '..';
import { PageRoutes as HomeRoutes } from '../home';

export const PageRoutes: PageRoutesProps = {
  base: {
    url: '/settings/*',
    label: 'Settings',
  },
};

export const PageNavItems: PageNavProps = [HomeRoutes.base];

export default {
  PageRoutes,
  PageNavItems,
};
