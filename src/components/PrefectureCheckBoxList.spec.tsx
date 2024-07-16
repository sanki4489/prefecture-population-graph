import { describe, expect, vi, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PrefectureCheckBoxList from './PrefectureCheckBoxList';
import { PrefectureType } from '../types/Types';

describe('PrefectureCheckBoxList Component', () => {
  const mockPrefList: PrefectureType[] = [
    { prefCode: 1, prefName: 'Tokyo' },
    { prefCode: 2, prefName: 'Osaka' }
  ];

  const mockSelectedPrefList = [
    { checked: true, name: 'Tokyo', id: '1' },
    { checked: false, name: 'Osaka', id: '2' }
  ];

  const handleCheckBoxClick = vi.fn();

  test('It should renders checkboxes for each prefecture', () => {
    render(
      <PrefectureCheckBoxList
        prefList={mockPrefList}
        selectedPrefList={mockSelectedPrefList}
        hanldeCheckBoxClick={handleCheckBoxClick}
      />
    );

    // Check for the prefecture names
    mockPrefList.forEach((pref) => {
      expect(screen.getByLabelText(pref.prefName)).toBeInTheDocument();
    });
  });

  test('It should calls handleCheckBoxClick when a checkbox is clicked', () => {
    render(
      <PrefectureCheckBoxList
        prefList={mockPrefList}
        selectedPrefList={mockSelectedPrefList}
        hanldeCheckBoxClick={handleCheckBoxClick}
      />
    );

    const tokyoCheckbox = screen.getByLabelText('Tokyo');
    fireEvent.click(tokyoCheckbox);

    expect(handleCheckBoxClick).toHaveBeenCalledTimes(1);
  });
});
