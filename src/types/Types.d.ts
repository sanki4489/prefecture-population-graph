export interface ResponseType<T> {
  message: string;
  result: T;
}

export interface PrefectureType {
  prefCode: number;
  prefName: string;
}

export interface PopulationDataType {
  year: number;
  value: number;
  rate?: number;
}

export interface PopulationType {
  boundaryYear: number;
  data: { label: string; data: PopulationDataType[] }[];
}
