import React from 'react';
import {
  NavProps,
  NavConfig,
  ModuleConfigDict,
  ModuleConfigList,
} from './player-nav.types';
import * as styles from './player-nav.module.scss';
import { utls } from '../../services';

const toModuleFormat = (config: NavConfig): ModuleConfigList => {
  const dict: ModuleConfigDict = {};

  config.forEach(def => {
    if (!utls.hasProp(dict, def.moduleName)) {
      dict[def.moduleName] = [];
    }

    dict[def.moduleName].push(def);
  });

  return Object.keys(dict).map(name => {
    return {
      name: name,
      lessons: dict[name],
    };
  });
};

export const Nav = ({ config }: NavProps) => {
  const fConfig = toModuleFormat(config);

  return (
    <div className={styles.nav}>
      {fConfig.map((def, mIdx: number) => {
        return (
          <div key={mIdx}>
            <div>{def.name}</div>
            <ul>
              {def.lessons.map((lesson, lIdx: number) => {
                return (
                  <li key={lIdx}>
                    <a href={`#${lesson.url}`}>{lesson.name}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default {
  Nav,
};
