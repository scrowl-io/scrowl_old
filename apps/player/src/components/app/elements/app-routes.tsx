import React from 'react';
import { Routes as DomRoutes, Route, Navigate } from 'react-router-dom';
import { AppRoutesProps } from '../player-app.types';

export const Routes = ({ config, templateList }: AppRoutesProps) => {
  return (
    <DomRoutes>
      {config.map((page, idx: number) => {
        return (
          <Route
            key={idx}
            path={`${page.url}`}
            element={<page.Element templateList={templateList} />}
          />
        );
      })}
      <Route path="*" element={<Navigate to={config[0].url} />} />
    </DomRoutes>
  );
};

export default {
  Routes,
};
