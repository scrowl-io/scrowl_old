import React from 'react';
import { ButtonDefaultProps } from '@owlui/lib';
import { HeadingProps } from './elements';
export interface BlockElementButton {
  id?: string;
  type: 'button';
  props: ButtonDefaultProps;
}
export interface BlockElementHeading {
  id?: string;
  type: 'heading';
  props: HeadingProps;
}

export type BlockElement = BlockElementButton | BlockElementHeading;

export interface BlockConfig {
  id?: string;
  elements: Array<BlockElement>;
}

export interface BlockCommons {
  elements: Array<BlockElement>;
}

export type BlockProps = BlockCommons & React.AllHTMLAttributes<HTMLDivElement>;
