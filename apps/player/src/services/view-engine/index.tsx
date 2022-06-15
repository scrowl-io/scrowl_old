import React from 'react';
import { Element as Block } from '../../components/block/index';
import { BlockConfig } from '../../components/block/block.types';
import { Element as Section } from '../../components/section/index';
import { SectionConfig } from '../../components/section/section.types';

export const renderBlock = (blockConfig: BlockConfig, index: number) => {
  const key = blockConfig.id || index;

  return <Block key={key} elements={blockConfig.elements} />;
};

export const renderSection = (sectionConfig: SectionConfig, index: number) => {
  const key = sectionConfig.id || index;
  const blocks = sectionConfig.blocks.map(renderBlock);

  return <Section key={key}>{blocks}</Section>;
};

export default {
  renderBlock,
  renderSection,
};
