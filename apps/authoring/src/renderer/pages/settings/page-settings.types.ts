import React from 'react';
import { Preferences } from '../../models';

export interface SubPageCommons {
  preferences: Preferences.PreferenceData;
}

export type SubPageProps = Partial<SubPageCommons> &
  React.AllHTMLAttributes<HTMLDivElement>;
