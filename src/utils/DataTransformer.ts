import { PopulationDataType, PopulationType } from '../types/Types';

type InputDataType = {
  checked: boolean;
  name: string;
  id: string;
  population?: PopulationType['data'];
};

type IntermediateDataType = {
  name: string;
  population: PopulationDataType[];
};

type OutputDataType = {
  year: number;
  [prefecture: string]: number;
};

export const DataTransformer = (inputData: InputDataType[], index: number): OutputDataType[] => {
  const intermediateData: IntermediateDataType[] = [];

  inputData.forEach((item) => {
    if (item.checked && item.population) {
      intermediateData.push({ name: item.name, population: item.population[index].data });
    }
  });

  const years: { [key: number]: OutputDataType } = {};

  intermediateData.forEach((city) => {
    city.population.forEach((record) => {
      const { year, value } = record;
      if (!years[year]) {
        years[year] = { year };
      }
      years[year][city.name] = value;
    });
  });

  const currentYear = new Date().getFullYear();
  const result = Object.values(years).filter((i) => i.year <= currentYear);

  return result;
};
