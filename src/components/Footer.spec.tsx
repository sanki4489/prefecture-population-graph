import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { describe, test, expect } from 'vitest';

describe('Footer Component', () => {
  test('It should renders footer with correct content', () => {
    render(<Footer />);

    // Check for author link
    const authorLink = screen.getByText(/Sankalp verma/i);
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute('href', 'https://github.com/sanki4489');

    // Check for copyright text
    const copyrightText = screen.getByText(/Copyright © 2024. All rights reserved./i);
    expect(copyrightText).toBeInTheDocument();
  });
});
