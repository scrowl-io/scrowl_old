import React from 'react';
import { render, screen } from '@testing-library/react';
import { TitleBar } from './index';

// Create routes that will be used to render the component
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

// The TitleBar component uses the `useLocation` hook from react-router-dom
// so we need to mock a route in order to Jest to render the component
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
  const expectedText = 'Scrowl - Create New';

  render(<TitleBar pages={routes} />);

  const toolBar = screen.getByText(expectedText);

  expect(toolBar).toBeTruthy;
});
