import React from 'react';

export const _buildContents = (contents: string) => {
  return () => {
    return <>{contents}</>;
  };
};

export const createPage = (route: string, contents: string) => {
  return {
    Route: route,
    Element: _buildContents(contents),
  };
};

export default {
  _buildContents,
  createPage,
};
