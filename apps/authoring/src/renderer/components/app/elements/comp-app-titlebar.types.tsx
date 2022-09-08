import { SetStateAction } from 'react';
import { PageNavProps } from '../../../pages';

export interface TitleBarCommons {
  routes: PageNavProps;
}

export interface TextInputCommons {
  searchInput: string;
  searchItems: (arg: string) => void;
}

export type TitleBarProps = Partial<TitleBarCommons>;
