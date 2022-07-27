import { PageRoutesProps, PageNavProps } from '../';

export const PageRoutes: PageRoutesProps = {
  base: {
    url: '/',
    label: 'Home'
  }
};

export const PageNavItems: PageNavProps = [
  PageRoutes.base,
  // TODO below routes are just for testing purposes REMOVE
  {
    url: '/editor',
    label: 'Editor',
  },
  {
    url: '/settings',
    label: 'Settings',
  },
];

export default {
  PageRoutes,
  PageNavItems,
};
