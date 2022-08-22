import React from 'react';
import * as styles from './comp-loading.module.scss';
import { Project } from '../../models';

const project = new Project();

const Loading = () => {
  //   project.init();

  const isProcessing = project.useProcessing();

  return <div>{isProcessing ? <div>LOADING...</div> : <div>DONE</div>}</div>;
};

export default {
  Loading,
};
