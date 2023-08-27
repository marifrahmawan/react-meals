import { useEffect, useState } from 'react';
import Card from '../UI/Card';

import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await fetch(
        'https://react-httprequest-c9392-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
      );

      if (response.status !== 200) {
        throw new Error('Something went Wrong!');
      }

      const jsonData = await response.json();

      const loadedMeals = [];

      for (const mealsKey in jsonData) {
        loadedMeals.push({
          id: mealsKey,
          key: mealsKey,
          name: jsonData[mealsKey].name,
          description: jsonData[mealsKey].description,
          price: jsonData[mealsKey].price,
        });

        setMealsData(loadedMeals);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <section className={classes.meals}>
      <Card>
        {error && <p className={classes.mealsError}>{error}</p>}
        {loading && <p className={classes.mealsLoading}>Loading . . .</p>}
        {!loading && !error && (
          <ul>
            {mealsData.map((meal) => {
              return (
                <MealItem
                  id={meal.id}
                  key={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                />
              );
            })}
          </ul>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
