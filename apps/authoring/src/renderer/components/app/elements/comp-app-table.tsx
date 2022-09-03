import React from 'react';
import { useLocation } from 'react-router-dom';
import * as styles from '../styles/comp-app.module.scss';

import {
  Table,
  TableDefaultProps,
  TableData,
  TableRowItem,
  ModalDefaultProps,
  Input,
  TextInputProps,
  TextInputDefaultProps,
} from '@owlui/lib';

export const Element = ({ projectsData }: any) => {
  return <Table tableData={projectsData} />;
};

export default {
  Element,
};
