import React from 'react';

export interface TextboxCommons {
  theme?: 'Default' | 'Dark';
  size?: 'Lg' | 'Md' | 'Sm';
}

export type TextboxProps = TextboxCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
