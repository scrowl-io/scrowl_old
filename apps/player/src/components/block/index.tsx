import React from 'react';
import * as Components from '@owlui/lib';
// eslint-disable-next-line import/named
import { BlockElement, BlockProps } from './block.types';
import * as styles from './block.module.scss';

const createElement = (elementConfig: BlockElement, index: number) => {
  const key = elementConfig.id || index;

  switch (elementConfig.type) {
    case 'button':
      return <Components.button.Default key={key} {...elementConfig.props} />;
    default:
      return <></>;
  }
};

export const Element = (props: BlockProps) => {
  const elements = props.elements;
  const nodes = elements.map(createElement);

  return <div className={styles.block}>{nodes}</div>;
};

export default {
  Element,
};
