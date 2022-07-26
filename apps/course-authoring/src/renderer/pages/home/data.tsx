import { CardProps } from '../../components/cardgrid/index.types';
import { PageRoutes } from '../editor/routes';

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
    btnRoute: PageRoutes['structure'],
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

export const filesList = {
  columns: [
    {
      label: 'Name',
      field: 'name',
    },
    {
      label: 'File Location',
      field: 'fileLocation',
    },
    {
      label: 'Last Modified',
      field: 'lastModified',
    },
    {
      label: 'size',
      field: 'size',
    },
  ],
  items: [
    {
      name: 'AODA v1.0.4',
      fileLocation: '/Users/jsmith/Documents/Courses',
      lastModified: 'yesterday',
      size: '543 MB',
    },
    {
      name: 'Working at Heights v4.0.3',
      fileLocation: '/Users/jsmith/Documents/Courses',
      lastModified: 'last week',
      size: '124 MB',
    },
    {
      name: 'Worker Health and Safety Awareness v2.0.1',
      fileLocation: '/Users/jsmith/Documents/Courses',
      lastModified: 'February 28',
      size: '301 MB',
    },
    {
      name: 'Office Ergonomics',
      fileLocation: '/Users/jsmith/Documents/Courses',
      lastModified: 'January 14',
      size: '90 MB',
    },
    {
      name: 'Workplace Hazardous Materials Information System (WHIMIS)',
      fileLocation: '/Users/jsmith/Documents/Courses',
      lastModified: 'December 13, 2022',
      size: '805 MB',
    },
  ],
};

export const EXAMPLE_PROJECT = {
  name: '',
  description: '',
  theme: '',
};

export default {
  sidebarItems,
  cards,
  filesList,
};
