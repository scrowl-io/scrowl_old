import React from 'react';

export interface HeadingCommons {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export type HeadingProps = HeadingCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
