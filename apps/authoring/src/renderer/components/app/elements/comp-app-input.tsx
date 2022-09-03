import React from 'react';
import { useLocation } from 'react-router-dom';
import * as styles from '../styles/comp-app.module.scss';
import { TitleBarProps } from './comp-app-titlebar.types';

import { Input, TextInputProps, TextInputDefaultProps } from '@owlui/lib';

export const Element = ({ searchItems, setSearchInput, searchInput }: any) => {
  const inputProps: TextInputProps = {
    label: {
      content: 'Project Search',
      htmlFor: 'text',
    },
    control: {
      id: 'text',
      type: 'text',
      disabled: false,
      readOnly: false,
      plaintext: false,
      placeholder: 'e.g. Safety Training',
      value: searchInput,
      onChange: e => searchItems((e.target as HTMLInputElement).value),
      // onChange: e => setSearchInput((e.target as HTMLInputElement).value),
    },
  };

  return (
    <Input
      // onChange={e => searchItems((e.target as HTMLInputElement).value)}
      inputProps={inputProps}
    />
  );
};

export default {
  Element,
};
