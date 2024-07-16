import { describe, test, expect } from 'vitest';
import { DataTransformer } from './DataTransformer';

describe('DataTransformer', () => {
  test('It should transforms data correctly', () => {
    const inputData = [
      {
        checked: true,
        name: 'Tokyo',
        id: '1',
        population: [
          {
            label: '2020',
            data: [
              { year: 2020, value: 10000 },
              { year: 2021, value: 10200 }
            ]
          }
        ]
      },
      {
        checked: true,
        name: 'Osaka',
        id: '2',
        population: [
          {
            label: '2020',
            data: [
              { year: 2020, value: 8000 },
              { year: 2021, value: 8200 }
            ]
          }
        ]
      }
    ];

    const expectedOutput = [
      { year: 2020, Tokyo: 10000, Osaka: 8000 },
      { year: 2021, Tokyo: 10200, Osaka: 8200 }
    ];

    expect(DataTransformer(inputData, 0)).toEqual(expectedOutput);
  });

  test('It should handle unchecked items correctly', () => {
    const inputData = [
      {
        checked: false,
        name: 'Tokyo',
        id: '1',
        population: [
          {
            label: '2020',
            data: [
              { year: 2020, value: 10000 },
              { year: 2021, value: 10200 }
            ]
          }
        ]
      },
      {
        checked: true,
        name: 'Osaka',
        id: '2',
        population: [
          {
            label: '2020',
            data: [
              { year: 2020, value: 8000 },
              { year: 2021, value: 8200 }
            ]
          }
        ]
      }
    ];

    const expectedOutput = [
      { year: 2020, Osaka: 8000 },
      { year: 2021, Osaka: 8200 }
    ];

    expect(DataTransformer(inputData, 0)).toEqual(expectedOutput);
  });

  test('It should handle items with no data correctly', () => {
    const inputData = [
      {
        checked: true,
        name: 'Tokyo',
        id: '1',
        population: undefined
      },
      {
        checked: true,
        name: 'Osaka',
        id: '2',
        population: [
          {
            label: '2020',
            data: [
              { year: 2020, value: 8000 },
              { year: 2021, value: 8200 }
            ]
          }
        ]
      }
    ];

    const expectedOutput = [
      { year: 2020, Osaka: 8000 },
      { year: 2021, Osaka: 8200 }
    ];

    expect(DataTransformer(inputData, 0)).toEqual(expectedOutput);
  });

  test('It should handle items with different years correctly', () => {
    const inputData = [
      {
        checked: true,
        name: 'Tokyo',
        id: '1',
        population: [
          {
            label: '2020',
            data: [
              { year: 2020, value: 10000 },
              { year: 2021, value: 10200 }
            ]
          }
        ]
      },
      {
        checked: true,
        name: 'Osaka',
        id: '2',
        population: [
          {
            label: '2020',
            data: [
              { year: 2021, value: 8200 },
              { year: 2022, value: 8400 }
            ]
          }
        ]
      }
    ];

    const expectedOutput = [
      { year: 2020, Tokyo: 10000 },
      { year: 2021, Tokyo: 10200, Osaka: 8200 },
      { year: 2022, Osaka: 8400 }
    ];

    expect(DataTransformer(inputData, 0)).toEqual(expectedOutput);
  });

  test('It should filters out years greater than the current year', () => {
    const inputData = [
      {
        checked: true,
        name: 'Tokyo',
        id: '1',
        population: [
          {
            label: '2020',
            data: [
              { year: 2023, value: 10000 },
              { year: 2024, value: 10200 }
            ]
          }
        ]
      }
    ];

    const currentYear = new Date().getFullYear();
    const result = DataTransformer(inputData, 0);

    expect(result.every((item) => item.year <= currentYear)).toBe(true);
  });
});
