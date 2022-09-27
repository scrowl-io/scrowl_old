import React from 'react';
import { Pages } from '../../services';

export type TemplateList = {
  [key: string]: () => JSX.Element;
};

export interface AppCommons {
  templateList?: TemplateList;
}

export type AppProps = AppCommons & React.AllHTMLAttributes<HTMLDivElement>;

export interface AppRoutesCommons {
  config: Array<Pages.PageDefinition>;
  templateList?: TemplateList;
}

export type AppRoutesProps = AppRoutesCommons;
