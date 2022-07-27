import React from 'react';
import { BlockConfig } from '../../components/block/block.types';

export interface SectionConfig {
  id?: string;
  name: string;
  blocks: Array<BlockConfig>;
}

export type SectionProps = React.AllHTMLAttributes<HTMLDivElement>;
