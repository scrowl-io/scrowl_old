import React from 'react';
import { PreferenceData } from '../../../main/models/preferences';

export type { PreferenceData } from '../../../main/models/preferences';

export type PreferenceObserverDataFn = React.Dispatch<PreferenceData>;

export type PreferenceObserverProcessFn = React.Dispatch<boolean>;

export type PreferenceObserverOpenFn = React.Dispatch<boolean>;

export type PreferenceNavigator = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (to: string, options?: { replace?: boolean; state?: any }): void;
  (delta: number): void;
};
