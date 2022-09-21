import React from 'react';
import { PageDefinition, GetResult } from './mode-pages.types';
import { Manifest } from '../';

export const getPages = (project: Manifest.ProjectData): GetResult => {
  if (!project.modules) {
    return {
      error: true,
      message: 'manifest has no modules',
    };
  }

  const data: Array<PageDefinition> = [];

  project.modules.forEach(module => {
    if (!module.lessons || !module.lessons.length) {
      return;
    }

    module.lessons.forEach(lesson => {
      if (!lesson.slides || !lesson.slides.length) {
        return;
      }

      data.push({
        moduleId: module.id || -1,
        moduleName: module.name,
        id: lesson.id || -1,
        name: lesson.name,
        url: `/module-${module.id}--lesson-${lesson.id}`,
        Element: () => {
          return (
            <div>
              <h1>{lesson.name}</h1>
            </div>
          );
        },
      });
    });
  });

  return {
    error: false,
    data,
  };
};

export default {
  getPages,
};
