import React from 'react';
import { HeadingProps } from './types';
import * as styleMod from './heading.module.scss';
import { createLocalProps } from '@owlui/lib';

export const Heading = (props: HeadingProps) => {
  const baseClass = 'heading';
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
        ],
      },
    },
    ['theme', 'type', 'children']
  );
  const { type, children } = props;
  const Element = type;

  return <Element {...locals}>{children}</Element>;
};

export default {
  Heading,
};
