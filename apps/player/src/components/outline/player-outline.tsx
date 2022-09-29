import React from 'react';
import { Tabs } from '@owlui/lib';
import {
  OutlineProps,
  NavConfig,
  ModuleConfigDict,
  ModuleConfigList,
} from './player-outline.types';
import { utls } from '../../services';
import { Pane } from '../';
import { TabNav, TabGlossary } from './elements';

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

export const Outline = ({ config, glossary }: OutlineProps) => {
  const fConfig = toModuleFormat(config);
  console.log('fConfig', fConfig);
  const tabItems = [
    {
      id: '1',
      title: 'Outline',
      view: <TabNav config={fConfig} />,
    },
    {
      id: '2',
      title: 'Glossary',
      view: <TabGlossary glossary={glossary} />,
    },
  ];

  return (
    <Pane>
      <Tabs items={tabItems} pxScale="Sm" />
    </Pane>
  );
};

export default {
  Outline,
};
