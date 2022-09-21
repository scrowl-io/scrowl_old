import React from 'react';
import { Routes as DomRoutes, Route, Navigate } from 'react-router-dom';
import { Pages } from '../../../services';

export interface AppRoutesCommons {
  config: Array<Pages.PageDefinition>;
}

export type AppRoutesProps = AppRoutesCommons;

export const Routes = ({ config }: AppRoutesProps) => {
  return (
    <DomRoutes>
      {config.map((page, idx: number) => {
        return (
          <Route key={idx} path={`${page.url}`} element={<page.Element />} />
        );
      })}
      <Route path="*" element={<Navigate to={config[0].url} />} />
    </DomRoutes>
  );
};

export default {
  Routes,
};
