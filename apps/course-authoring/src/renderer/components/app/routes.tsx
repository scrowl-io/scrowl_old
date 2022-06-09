import pageHome from '../../pages/home';
import pageEditor from '../../pages/editor';
import pageSettings from '../../pages/settings';
import { AppRoutesProps } from './index.types';

export const appRoutes: AppRoutesProps = {
  basename: '/',
  pages: [pageHome, pageEditor, pageSettings],
};

export default { appRoutes };
