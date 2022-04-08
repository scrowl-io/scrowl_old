import { expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { App } from '../../components/app/index';

test('app component renders h1 heading', () => {
  render(<App />);
  expect(screen.findByTestId('app__header')).toBeTruthy();
});
