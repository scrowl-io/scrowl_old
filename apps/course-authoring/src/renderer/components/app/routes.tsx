import pageHome from '../../pages/home';
import pageEditor from '../../pages/editor';
import { AppRoutesProps } from './index.types';

export const appRoutes: AppRoutesProps = {
  basename: '/',
  pages: [pageHome, pageEditor],
};

export default { appRoutes };
