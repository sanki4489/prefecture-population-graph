import { ResponsiveContainer, Line, LineChart, Tooltip, XAxis, YAxis, Label, Legend, CartesianGrid } from 'recharts';
import { PopulationType } from '../types/Types';
import { DataTransformer } from '../utils/DataTransformer.ts';
import { ColorList } from '../utils/ColorList.ts';

type ChartProps = {
  data: { checked: boolean; name: string; id: string; population?: PopulationType['data'] }[];
  index: number;
};

function PopulationChart(props: ChartProps) {
  const { data, index } = props;

  const chartData = DataTransformer(data, index);

  return (
    <section className='chartContainer'>
      <ResponsiveContainer width='85%' height={600}>
        <LineChart
          width={600}
          height={550}
          data={chartData.length !== 0 ? chartData : [{ year: 'dataがありません。' }]}
          margin={{ top: 30, bottom: 30, right: 10, left: 20 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='year'>
            <Label value='年産' position='bottom' />
          </XAxis>
          <YAxis>
            <Label value='人口数' position='top' />
          </YAxis>
          <Tooltip />
          <Legend layout='horizontal' verticalAlign='top' />
          {data.map((item, index) => {
            return <Line key={item.name} dataKey={item.name} stroke={ColorList[index]} />;
          })}
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

export default PopulationChart;
