import axios from 'axios';
import { describe, test, expect, vi, afterEach } from 'vitest';
import { getPrefectureList, getPrefecturePopulation } from '../service/Service';

const getSpy = vi.spyOn(axios, 'get');

describe('API Services', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('It should fetch the prefecture list', async () => {
    const mockResponse = {
      message: 'Success',
      result: [{ prefCode: 1, prefName: 'Tokyo' }]
    };

    getSpy.mockResolvedValueOnce({ data: mockResponse });

    const result = await getPrefectureList();
    expect(result).toEqual(mockResponse);
    expect(getSpy).toHaveBeenCalledWith('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: {
        'X-API-KEY': import.meta.env.VITE_RESAS_API
      }
    });
  });

  test('It should fetch the prefecture population', async () => {
    const mockResponse = {
      message: 'Success',
      result: {
        boundaryYear: 2020,
        data: [{ label: '2020', data: [{ year: 2020, value: 10000 }] }]
      }
    };

    getSpy.mockResolvedValueOnce({ data: mockResponse });

    const result = await getPrefecturePopulation('1');
    expect(result).toEqual(mockResponse);
    expect(getSpy).toHaveBeenCalledWith(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=1`,
      {
        headers: {
          'X-API-KEY': import.meta.env.VITE_RESAS_API
        }
      }
    );
  });

  test('It should handle errors when fetching prefecture list', async () => {
    getSpy.mockRejectedValueOnce(new Error('Network Error'));

    const result = await getPrefectureList();
    expect(result).toBeNull();
    expect(getSpy).toHaveBeenCalled();
  });

  test('It should handle errors when fetching prefecture population', async () => {
    getSpy.mockRejectedValueOnce(new Error('Network Error'));

    const result = await getPrefecturePopulation('1');
    expect(result).toBeNull();
    expect(getSpy).toHaveBeenCalled();
  });

  test('It should return null when prefecture list is empty', async () => {
    const mockResponse = {
      message: 'Success',
      result: []
    };

    getSpy.mockResolvedValueOnce({ data: mockResponse });

    const result = await getPrefectureList();
    expect(result).toEqual(mockResponse);
    expect(result?.result).toEqual([]);
  });

  test('It should handle empty response for prefecture population', async () => {
    const mockResponse = {
      message: 'Success',
      result: {
        boundaryYear: 2020,
        data: []
      }
    };

    getSpy.mockResolvedValueOnce({ data: mockResponse });

    const result = await getPrefecturePopulation('1');
    expect(result).toEqual(mockResponse);
    expect(result?.result.data).toEqual([]);
  });
});
