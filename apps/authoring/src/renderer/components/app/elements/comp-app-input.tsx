import React from 'react';
import { Input, TextInputProps } from '@owlui/lib';
import { TextInputCommons } from './comp-app-titlebar.types';

export const Element = ({ searchItems, searchInput }: TextInputCommons) => {
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
    },
  };

  return <Input inputProps={inputProps} />;
};

export default {
  Element,
};
