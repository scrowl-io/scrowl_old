import pageStructure from './structure';
import pageBuild from './build';

export const editorRoutes = {
  pages: [pageStructure, pageBuild],
};

export const navigationLinks = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Structure',
    link: '/editor/structure',
  },
  {
    label: 'Build',
    link: '/editor/build',
  },
];
