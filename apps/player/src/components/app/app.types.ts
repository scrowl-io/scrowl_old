import React from 'react';
import { ProjectConfig } from '../project/project.types';

export interface Manifest {
  error: boolean;
  message: string;
  data?: ProjectConfig;
};

export interface ErrorCommons {
  msg: string
}

export type ErrorProps = ErrorCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
