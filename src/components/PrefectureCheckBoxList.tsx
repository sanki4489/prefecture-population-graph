import { PopulationType, PrefectureType } from '../types/Types';
import PrefectureCheckBox from './PrefectureCheckBox';

type PrefectureCheckBoxListPropsType = {
  prefList: PrefectureType[];
  selectedPrefList: { checked: boolean; name: string; id: string; population?: PopulationType['data'] }[];
  hanldeCheckBoxClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PrefectureCheckBoxList = (props: PrefectureCheckBoxListPropsType) => {
  const { prefList, selectedPrefList, hanldeCheckBoxClick } = props;

  return (
    <section className='prefecture'>
      <h3 className='textCenter'>都道府県</h3>

      <div className='populationContainer'>
        <div className='checkBoxList'>
          {prefList.map((pref) => (
            <PrefectureCheckBox
              key={pref.prefCode}
              prefecture={pref}
              checked={selectedPrefList.find((i) => i.id === pref.prefCode.toString())?.checked || false}
              handleClick={hanldeCheckBoxClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrefectureCheckBoxList;
