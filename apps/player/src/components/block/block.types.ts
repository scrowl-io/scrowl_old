import React from 'react';
import { ButtonDefaultProps } from '@owlui/lib';
import { HeadingProps, TextboxProps } from './elements';

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

export interface BlockElementTextbox {
  id?: string;
  type: 'textbox';
  props: TextboxProps;
}

export type BlockElement =
  | BlockElementButton
  | BlockElementHeading
  | BlockElementTextbox;

export interface BlockConfig {
  id?: string;
  elements: Array<BlockElement>;
}

export interface BlockCommons {
  elements: Array<BlockElement>;
}

export type BlockProps = BlockCommons & React.AllHTMLAttributes<HTMLDivElement>;
