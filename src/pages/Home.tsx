import { useEffect, useState } from 'react';
import { PopulationType, PrefectureType } from '../types/Types';
import { getPrefectureList, getPrefecturePopulation } from '../service/Service';
import PrefectureCheckBoxList from '../components/PrefectureCheckBoxList';
import PopulationTypeButtonList from '../components/PopulationTypeButtonList';

type SelectedPrefListType = {
  checked: boolean;
  name: string;
  id: string;
  population?: PopulationType['data'];
};

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [prefList, setPrefList] = useState([] as PrefectureType[]);
  const [selectedPrefList, setSelectedPrefList] = useState<SelectedPrefListType[]>([]);
  const [populationType, setPopulationType] = useState<number>(0);

  const init = async () => {
    const res = await getPrefectureList();
    setPrefList(res?.result || []);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    init();
  }, []);

  const handleBtnClick = (index: number) => {
    setPopulationType(index);
  };

  const hanldeCheckBoxClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, id, checked } = e.target;

    let population: PopulationType['data'] = [];

    if (checked) {
      population = (await getPrefecturePopulation(id))?.result.data || [];

      setSelectedPrefList((prev) => {
        const update = [...prev];
        const index = update.findIndex((i) => i.id === id);
        if (index !== -1) {
          update[index] = { ...update[index], checked: checked, name: name, population: population };
        } else {
          update.push({ checked: checked, name: name, id: id, population: population });
        }

        return update;
      });
    } else {
      setSelectedPrefList((prev) => {
        const update = prev.filter((i) => i.id !== id);
        return update;
      });
    }
  };

  if (isLoading) {
    return (
      <div className='loading'>
        <div className='spinner'></div>
      </div>
    );
  }

  return (
    <section>
      <PrefectureCheckBoxList
        prefList={prefList || []}
        selectedPrefList={selectedPrefList}
        hanldeCheckBoxClick={hanldeCheckBoxClick}
      />
      <PopulationTypeButtonList populationType={populationType} handleBtnClick={handleBtnClick} />
    </section>
  );
};

export default Home;
