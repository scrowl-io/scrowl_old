import * as viewEngine from '../../services/view-engine';
import { ProjectConfig, LayoutProps } from './project.types';
import { SectionConfig } from '../section/section.types';

const toUrlCase = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, '-');
};

const addSection = (sectionConfig: SectionConfig, index: number) => {
  return {
    name: sectionConfig.name,
    Route: `/${toUrlCase(sectionConfig.name)}`,
    Element: () => {
      const section = viewEngine.renderSection(sectionConfig, index);

      return section;
    },
  };
};

export const createLayout = (projectConfig: ProjectConfig) => {
  const layout: LayoutProps = projectConfig.sections.map(addSection);

  return layout;
};

export default {
  createLayout,
};
