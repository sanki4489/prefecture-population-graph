import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.tsx';

describe('App を render したとき', () => {
  test('It should render hello world', () => {
    render(<App />);

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });
});
