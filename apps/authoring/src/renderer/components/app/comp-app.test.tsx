import React from 'react';
import { render, screen } from '@testing-library/react';

// Create routes that will be used to render the component
const routes = [
  {
    url: '/',
    label: 'Dashboard',
  },
  {
    url: '/create',
    label: 'Create New Project',
  },
];

// The TitleBar component uses the `useLocation` hook from react-router-dom
// so we need to mock a route in order to Jest to render the component
jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as object),
  useLocation: jest.fn().mockImplementation(() => {
    return { pathname: '/create' };
  }),
}));
