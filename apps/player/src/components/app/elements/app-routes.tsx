import React from 'react';
import { Routes as DomRoutes, Route, Navigate } from 'react-router-dom';
import { Manifest } from '../../../models';
import { Error } from '../../';

export interface AppRoutesCommons {
  manifest: Manifest.ProjectData;
}

export type AppRoutesProps = AppRoutesCommons;

export interface AppRouteItem {
  moduleId: number;
  moduleName: string;
  id: number;
  name: string;
  url: string;
  Element: () => JSX.Element;
}

const getPageData = (manifest: Manifest.ProjectData) => {
  if (!manifest.modules) {
    return {
      error: true,
      message: 'manifest has no modules',
    };
  }

  const data: Array<AppRouteItem> = [];

  manifest.modules.forEach(module => {
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

export const Routes = ({ manifest }: AppRoutesProps) => {
  const getRes = getPageData(manifest);

  if (getRes.error) {
    return <Error msg={getRes.message || ''} />;
  }

  const pages = getRes.data;

  if (!pages || !pages.length) {
    return <Error msg="No pages found in manifest" />;
  }

  return (
    <DomRoutes>
      {pages.map((page, idx: number) => {
        return (
          <Route key={idx} path={`${page.url}`} element={<page.Element />} />
        );
      })}
      <Route path="*" element={<Navigate to={pages[0].url} />} />
    </DomRoutes>
  );
};

export default {
  Routes,
};
