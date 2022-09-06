import React from 'react';
export interface LogoCommons {
  sizing: 'sm' | 'md';
}

export type LogoMixedElement =
  | React.AllHTMLAttributes<HTMLAnchorElement>
  | React.AllHTMLAttributes<HTMLDivElement>;

export type LogoProps = Partial<LogoCommons> & LogoMixedElement;
