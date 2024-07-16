import { describe, expect, vi, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PrefectureCheckBox from './PrefectureCheckBox';
import { PrefectureType } from '../types/Types';

describe('PrefectureCheckBox Component', () => {
  const mockPrefecture: PrefectureType = {
    prefCode: 1,
    prefName: 'Tokyo'
  };

  const handleClick = vi.fn();

  test('It should renders checkbox with correct label and state', () => {
    render(<PrefectureCheckBox prefecture={mockPrefecture} checked={false} handleClick={handleClick} />);

    const labelElement = screen.getByLabelText(/Tokyo/i);
    expect(labelElement).toBeInTheDocument();

    // checkbox not checked
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('It should calls handleClick when checkbox is clicked', () => {
    render(<PrefectureCheckBox prefecture={mockPrefecture} checked={false} handleClick={handleClick} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
