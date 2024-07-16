type PopulationTypeButtonListProp = {
  populationType: number;
  handleBtnClick: (index: number) => void;
};

const PopulationTypeButtonList = (props: PopulationTypeButtonListProp) => {
  const { populationType, handleBtnClick } = props;

  return (
    <section className='popultaionTypeContainer'>
      <div className='populationTypeBtnList'>
        <button onClick={() => handleBtnClick(0)} disabled={populationType === 0}>
          総人口
        </button>
        <button onClick={() => handleBtnClick(1)} disabled={populationType === 1}>
          年少人口
        </button>
        <button onClick={() => handleBtnClick(2)} disabled={populationType === 2}>
          生産年齢人口
        </button>
        <button onClick={() => handleBtnClick(3)} disabled={populationType === 3}>
          老年人口
        </button>
      </div>
    </section>
  );
};

export default PopulationTypeButtonList;
