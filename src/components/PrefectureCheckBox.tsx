import { PrefectureType } from '../types/Types';

type PrefectureCheckBoxListPropsType = {
  prefecture: PrefectureType;
  checked: boolean;
  handleClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PrefectureCheckBox = (props: PrefectureCheckBoxListPropsType) => {
  const { prefecture, checked, handleClick } = props;

  return (
    <div className='checkBox'>
      <label htmlFor={prefecture.prefCode.toString()}>
        <input
          type='checkbox'
          name={prefecture.prefName}
          id={prefecture.prefCode.toString()}
          value={prefecture.prefCode}
          checked={checked}
          onChange={handleClick}
        />
        {prefecture.prefName}
      </label>
    </div>
  );
};

export default PrefectureCheckBox;
