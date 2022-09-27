import React from 'react';
import { Icon } from '@owlui/lib';
import {
  OutlineNavLessonsProps,
  OutlineNavLessonProps,
} from '../../../player-outline.types';
import * as styles from '../../../player-outline.module.scss';

export const NavLesson = ({ config, idx }: OutlineNavLessonProps) => {
  return (
    <div className={styles.treeViewLesson} key={idx}>
      <div className={styles.treeViewHeader}>
        <span className={styles.treeViewItemIconDetail}>
          <Icon icon="interests" display="outlined" />
        </span>
        <span className={styles.treeViewItemLabel}>
          <a href={`#${config.url}`}>{config.name}</a>
        </span>
      </div>
    </div>
  );
};

export const NavLessons = ({ config, moduleIdx }: OutlineNavLessonsProps) => {
  return (
    <>
      {config.map((lesson, idx: number) => {
        return (
          <NavLesson
            key={idx}
            moduleIdx={moduleIdx}
            idx={idx}
            config={lesson}
          />
        );
      })}
    </>
  );
};

export default {
  NavLessons,
};
