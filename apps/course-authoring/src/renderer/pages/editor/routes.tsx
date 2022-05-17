import pageStructure from './structure';
import pageBuild from './build';
import { PageRoute, PageNav } from '../../pages/index.types';

export const PageRoutes: PageRoute = {
  base: '/editor',
};

export const PageChildren = [pageStructure, pageBuild];

export const PageNavItems: PageNav = [
  {
    label: 'Home',
    link: '/',
  },
];

const setRoute = (page: { PageRoute: string }) => {
  return `${PageRoutes.base}${page.PageRoute}`;
};

const setNav = () => {
  PageChildren.forEach(page => {
    const name = page.PageName.toLowerCase();
    PageRoutes[name] = setRoute(page);
    PageNavItems.push({
      label: page.PageName,
      link: PageRoutes[name],
    });
  });
};

setNav();

export default {
  PageChildren,
  PageRoutes,
  PageNavItems,
};
