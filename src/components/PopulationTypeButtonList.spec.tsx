import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PopulationTypeButtonList from './PopulationTypeButtonList';

describe('PopulationTypeButtonList Component', () => {
  const handleBtnClick = vi.fn();

  test('It should render buttons with correct labels and disabled state', () => {
    render(<PopulationTypeButtonList populationType={0} handleBtnClick={handleBtnClick} />);

    // Check button labels
    expect(screen.getByRole('button', { name: /総人口/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /年少人口/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /生産年齢人口/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /老年人口/i })).toBeInTheDocument();

    // Check disabled
    expect(screen.getByRole('button', { name: /総人口/i })).toBeDisabled();
  });

  test('It should disables the correct button based on populationType', () => {
    render(<PopulationTypeButtonList populationType={2} handleBtnClick={handleBtnClick} />);

    //'生産年齢人口' should be disabled
    expect(screen.getByRole('button', { name: /生産年齢人口/i })).toBeDisabled();
  });
});
