import React from 'react';
import { PreferenceData } from '../../models';

export interface SubPageCommons {
  preferences: PreferenceData;
}

export type SubPageProps = Partial<SubPageCommons> &
  React.AllHTMLAttributes<HTMLDivElement>;
