import { PieChart, Pie, ResponsiveContainer, LabelList } from 'recharts';
import { DrinkStatistics } from '../data/Drinkstatistics';

interface FavoritePieChartProps {
  data: DrinkStatistics[];
}

export function FavoritePieChart({ data }: FavoritePieChartProps) {
  const totalDrinks: number = data.reduce((sum, item) => sum + item.numberOfDrinks, 0);

  const dataWithLabels = data.map(item => {
    const percentage: number = totalDrinks > 0 ? ((item.numberOfDrinks / totalDrinks) * 100) : 0;
    return {
      ...item,
      percentage,
      combinedLabel: percentage > 0 ? `${item.type}: ${percentage.toFixed(1)}%` : ''
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="numberOfDrinks"
          startAngle={180} endAngle={0}
          data={dataWithLabels}
          cx="50%" cy="100%" outerRadius="170%"
        >

          <LabelList
            dataKey="combinedLabel"
            position="outside"
            style={{
              fontSize: '22px',
              fontWeight: 'bold',
              fill: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              stroke: 'none'
            }}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
