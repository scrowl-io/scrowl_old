import { CardProps } from '../../components/cardgrid/index.types';

export const sidebarItems = [
  {
    heading: 'RECENT FILES',
    items: [{ label: 'AODA v1.0.4' }, { label: 'Working at Heights v4.0.3' }],
  },
  {
    heading: 'HELP',
    items: [
      { label: 'User Guide' },
      { label: 'FAQ' },
      { label: 'Contact Support' },
    ],
  },
];

export const cards: CardProps[] = [
  {
    id: 1,
    title: 'New Blank Document',
    content: 'Start from scratch with no template applied.',
    btnTitle: 'Create New',
  },
  {
    id: 2,
    title: 'Open Existing File',
    content: 'Resume editing a file from your computer.',
    btnTitle: 'Open File...',
  },
  {
    id: 3,
    title: 'Start From Template',
    content: 'Choose a template filled with content to edit.',
    btnTitle: 'Choose Template...',
  },
  {
    id: 4,
    title: 'Demo Project',
    content:
      'Take a walkthrough an example project for a look at all the features.',
    btnTitle: 'Start Demo',
  },
];

export default {
  sidebarItems,
  cards,
};
