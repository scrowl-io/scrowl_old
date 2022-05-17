import { PageProps } from '../../pages/index.types';

export interface AppPagesProps {
  PageName: string;
  PageRoute: string;
  PageElement?: ({ handleTitleChange }: PageProps) => JSX.Element;
}
export interface AppRoutesProps {
  basename: string;
  pages: AppPagesProps[];
}
