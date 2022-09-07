import React from 'react';
import { PageRoutesProps, PageNavProps } from '../../pages';
import { ProjectData } from '../../../main/models/projects';

export interface AppPageProps {
  PageRoutes: PageRoutesProps;
  PageNavItems: PageNavProps;
  PageElement: () => JSX.Element;
}

export type AppPages = Array<AppPageProps>;

export type AppMainProps = React.AllHTMLAttributes<HTMLDivElement>;
