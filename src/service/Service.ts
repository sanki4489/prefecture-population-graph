import axios from 'axios';
import { PopulationType, PrefectureType, ResponseType } from '../types/Types';

const API_KEY = import.meta.env.VITE_RESAS_API;

export const getPrefectureList = async (): Promise<ResponseType<PrefectureType[]> | null> => {
  try {
    const res = await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: {
        'X-API-KEY': API_KEY
      }
    });
    return res.data;
  } catch (error) {
    // returning null for simple development
    return null;
  }
};

export const getPrefecturePopulation = async (prefCode: string): Promise<ResponseType<PopulationType> | null> => {
  try {
    const res = await axios.get(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      {
        headers: {
          'X-API-KEY': API_KEY
        }
      }
    );
    return res.data;
  } catch (error) {
    // returning null for simple development
    return null;
  }
};
