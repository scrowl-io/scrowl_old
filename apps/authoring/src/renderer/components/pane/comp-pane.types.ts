import React from 'react';

export interface PaneCommons {
  side: 'left' | 'right';
}

export type PaneProps = Partial<PaneCommons> &
  React.AllHTMLAttributes<HTMLDivElement>;
