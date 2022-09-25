/* eslint-disable import/named */
import { ButtonDefaultProps, DrawerDefaultProps } from '@owlui/lib';

export type GlossaryItem = { name: string; description: string };
export type GlossaryData = Array<GlossaryItem>;
export type GlossaryDictTerm = {
  idx: number;
  description: string;
};
export type GlossaryDictEntries = {
  [term: string]: GlossaryDictTerm;
};
export type GlossaryDict = {
  [heading: string]: GlossaryDictEntries;
};
export type GlossaryListProps = {
  glossary: GlossaryDict;
  onEdit: (idx: number) => void;
  onDelete: (idx: number) => void;
};
export type GlossaryListEntriesProps = {
  glossary: GlossaryDictEntries;
  onEdit: (idx: number) => void;
  onDelete: (idx: number) => void;
};
export type GlossaryAddBtnProps = ButtonDefaultProps;
export type GlossaryFormProps = {
  term: GlossaryItem;
  onHide: () => void;
  onSubmit: (term: GlossaryItem) => void;
};
export type GlossaryDrawerCommons = {
  onSubmit: (term: GlossaryItem) => void;
};
export type GlossaryDrawerProps = GlossaryDrawerCommons &
  GlossaryFormProps &
  Partial<DrawerDefaultProps>;
