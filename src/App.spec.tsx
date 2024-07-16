import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, expect, test, vi } from 'vitest';

vi.mock('./components/Header', () => {
  return {
    default: () => <div>Mocked Header</div>
  };
});
vi.mock('./components/Footer', () => {
  return {
    default: () => <div>Mocked Footer</div>
  };
});
vi.mock('./pages/Home', () => {
  return {
    default: () => <div>Mocked Home</div>
  };
});

describe('App Component', () => {
  test('It should renders Header, Home, and Footer components', () => {
    render(<App />);

    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
    expect(screen.getByText('Mocked Home')).toBeInTheDocument();
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
  });
});
