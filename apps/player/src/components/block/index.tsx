import React from 'react';
import { Button } from '@owlui/lib';
import { Heading, Textbox } from './elements';
import { BlockElement, BlockProps } from './block.types';
import * as styles from './block.module.scss';

const createElement = (elementConfig: BlockElement, index: number) => {
  const key = elementConfig.id || index;

  switch (elementConfig.type) {
    case 'button':
      return <Button key={key} {...elementConfig.props} />;
    case 'heading':
      return <Heading key={key} {...elementConfig.props} />;
    case 'textbox':
      return <Textbox key={key} {...elementConfig.props} />;
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
