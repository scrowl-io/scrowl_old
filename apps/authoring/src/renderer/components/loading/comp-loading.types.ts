import { PageNavProps } from '../../pages';

export interface NavigationBarProps {
  pages: PageNavProps;
  publishProject?: () => void;
}
