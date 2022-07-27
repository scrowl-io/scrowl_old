import React from 'react';
import { SectionConfig } from '../section/section.types';

export interface ProjectConfig {
  id?: string;
  name: string;
  sections: Array<SectionConfig>;
}

export interface LayoutItemProps {
  name: string;
  Route: string;
  Element: React.FunctionComponent;
}

export type LayoutProps = Array<LayoutItemProps>;
