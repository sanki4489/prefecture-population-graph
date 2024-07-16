import { render, screen } from '@testing-library/react';
import Header from './Header';
import { describe, test, expect } from 'vitest';

describe('Header Component', () => {
  test('It should renders header with correct title', () => {
    render(<Header />);

    // Check for the title in the header
    const headerTitle = screen.getByText(/Japan Prefecture wise population graph/i);
    expect(headerTitle).toBeInTheDocument();
    expect(headerTitle).toHaveClass('textCenter');
  });
});
