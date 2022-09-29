import React from 'react';
import { Tabs, Drawer, Button, Icon, TextInputProps, Input } from '@owlui/lib';
import {
  OutlineProps,
  NavConfig,
  ModuleConfigDict,
  ModuleConfigList,
} from './player-outline.types';
import { utls } from '../../services';
import { Pane } from '../';
import { TabNav, TabGlossary } from './elements';
import * as styles from './player-outline.module.scss';

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
  const [show, setShow] = React.useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

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

  const playerPaneInputProps: TextInputProps = {
    label: {
      content: '',
      htmlFor: 'text',
    },
    control: {
      id: 'text',
      type: 'text',
      disabled: false,
      readOnly: false,
      plaintext: false,
      placeholder: 'Search course...',
      value: '',
    },
  };

  const content = {
    header: {
      content: (
        <div>
          <Input inputProps={playerPaneInputProps} />
        </div>
      ),
      bsProps: {
        closeButton: true,
        className: '',
      },
    },
    body: (
      <Pane>
        <Tabs items={tabItems} pxScale="Sm" />
      </Pane>
    ),
  };

  return (
    <>
      <Button
        style={{
          height: '5vh',
          fontSize: '2rem',
          color: '#000000',
          margin: '0 .5rem',
        }}
        variant="link"
        onClick={toggleShow}
      >
        <Icon icon="menu" display="outlined" />
      </Button>
      <Drawer show={show} onHide={toggleShow} drawer={content} />
    </>
  );
};

export default {
  Outline,
};
