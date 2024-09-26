import { DrinkStatistics } from "../data/Drinkstatistics";

interface FavoriteStatisticsCardProps{
  data: DrinkStatistics[];
}

export default function FavoriteStatisticsCard( {data}  : FavoriteStatisticsCardProps) {
  const totalDrinks: number = data.reduce((sum, item) => sum + item.numberOfDrinks, 0);

  const dataWithLabels = data.map(item => {
    const percentage: number = totalDrinks > 0 ? ((item.numberOfDrinks / totalDrinks) * 100) : 0;
    return {
      ...item,
      percentage
    };
  });
  
  return (
    <div className="favorite-statistics-card-container">
      {
        dataWithLabels.map((dataItem) => (
          <div className="favorite-statistics-card">
            <h2>{dataItem.type}</h2>
            <h2>{dataItem.percentage.toFixed(1)}%</h2>
          </div>
        ))
      }
    </div>
  );
};
