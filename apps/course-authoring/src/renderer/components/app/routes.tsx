import pageHome from '../../pages/home';
import pageEditor from '../../pages/editor';
import { PageProps } from '../../pages/index.types';

interface AppPagesProps {
  PageName: string;
  PageRoute: string;
  PageElement?: ({ handleTitleChange }: PageProps) => JSX.Element;
}
interface AppRoutesProps {
  basename: string;
  pages: AppPagesProps[];
}

export const appRoutes: AppRoutesProps = {
  basename: '/',
  pages: [pageHome, pageEditor],
};

export default { appRoutes };
