import React from 'react';
import { SectionProps } from './section.types';
import * as styles from './section.module.scss';

export const Element = (props: SectionProps) => {
  return <div className={styles.section}>{props.children}</div>;
};

export default {
  Element,
};
