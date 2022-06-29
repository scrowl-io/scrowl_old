import React from 'react';
import { TextboxProps } from './types';
import * as styleMod from './textbox.module.scss';
import { createLocalProps } from '@owlui/utils';

export const Textbox = (props: TextboxProps) => {
  const baseClass = 'textbox';
  const locals = createLocalProps(
    props,
    {
      module: styleMod,
      classes: {
        prefix: '',
        base: baseClass,
        optionals: [
          {
            fields: ['theme'],
            value: 'theme',
          },
          {
            fields: ['size'],
            value: 'Size',
          },
        ],
      },
    },
    ['theme', 'size', 'children']
  );
  const { children } = props;

  return <p {...locals}>{children}</p>;
};

export default {
  Textbox,
};
