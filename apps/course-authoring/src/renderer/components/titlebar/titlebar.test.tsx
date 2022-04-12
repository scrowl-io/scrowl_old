import React from 'react';
import { render, screen } from '@testing-library/react';
import { TitleBar } from './index';

const routes = [
  {
    Route: '/',
    Name: 'Dashboard',
  },
  {
    Route: '/create',
    Name: 'Create New Course',
  },
];

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as {}),
  useLocation: jest.fn().mockImplementation(() => {
    return { pathname: '/create' };
  }),
}));

test('A toolbar element is rendered', () => {
  render(<TitleBar pages={routes} />);
  const toolBar = screen.getByTestId('toolbar');
  expect(toolBar).toBeTruthy;
});

test('Should render title from route', () => {
  const expectedText = 'Scrowl - Create New Course';

  render(<TitleBar pages={routes} />);

  const toolBar = screen.getByText(expectedText);

  expect(toolBar).toBeTruthy;
});
