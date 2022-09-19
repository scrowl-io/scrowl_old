import React from 'react';
import * as styles from './player-slide.module.scss';
import { SlideProps, AspectRatios } from './player-slide.types';

export const hasProp = (obj: object, prop: string) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

const aspectRatios: AspectRatios = {
  '4:3': {
    label: 'Standard 4:3',
    width: 1920,
    height: 1440,
  },
  '16:9': {
    label: 'Widescreen 16:9',
    width: 1920,
    height: 1080,
  },
  '16:10': {
    label: 'Widescreen 16:10',
    width: 1920,
    height: 1200,
  },
};

const deepCopy = (obj: unknown) => {
  return JSON.parse(JSON.stringify(obj));
};

export const Slide = ({ children, className, options, style }: SlideProps) => {
  const cssClasses = className
    ? `${styles.slide} ${className}`
    : `${styles.slide}`;
  const ratio =
    options.aspect && hasProp(aspectRatios, options.aspect)
      ? options.aspect
      : '16:9';
  const aspect = aspectRatios[ratio];
  const slideStyle = Object.assign(style ? deepCopy(style) : {}, {
    width: `${aspect.width}px`,
    height: `${aspect.height}px`,
  });

  return (
    <div className={cssClasses} style={slideStyle}>
      {children}
    </div>
  );
};

export default {
  Slide,
};
