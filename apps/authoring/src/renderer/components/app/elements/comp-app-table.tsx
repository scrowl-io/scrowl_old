import React from 'react';
import { Table, TableDefaultProps } from '@owlui/lib';

export const Element = ({ tableData }: TableDefaultProps) => {
  return <Table tableData={tableData} />;
};

export default {
  Element,
};
