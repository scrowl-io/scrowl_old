import React from 'react';
import { PageDefinition, GetResult } from './mode-pages.types';
import { Manifest } from '../../models';

export const getPages = (project: Manifest.ProjectData): GetResult => {
  if (!project.modules) {
    return {
      error: true,
      message: 'manifest has no modules',
    };
  }

  const data: Array<PageDefinition> = [];

  project.modules.forEach((module, mIdx: number) => {
    if (!module.lessons || !module.lessons.length) {
      return;
    }

    module.lessons.forEach((lesson, lIdx: number) => {
      if (!lesson.slides || !lesson.slides.length) {
        return;
      }

      data.push({
        moduleId: mIdx,
        moduleName: module.name,
        id: lIdx,
        name: lesson.name,
        url: `/module-${mIdx}--lesson-${lIdx}`,
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
