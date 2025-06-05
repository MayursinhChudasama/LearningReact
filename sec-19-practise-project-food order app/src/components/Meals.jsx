import { useState, useEffect } from "react";
export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  useEffect(() => {
    async function getMealItem() {
      const getItems = await fetch("http://localhost:3000/meals");
      const mealsData = await getItems.json();
      setLoadedMeals(mealsData);
    }
    getMealItem();
  }, []);
  return (
    <ul
      id='meals'
      className=''>
      {loadedMeals.map((item) => {
        return (
          <li key={item.id}>
            <article className='meal-item'>
              <img
                src={`http://localhost:3000/${item.image}`}
                alt={item.name}
              />
              <h3>{item.name}</h3>
              <p className='meal-item-price'>{item.price}</p>
              <p className='meal-item-description'>{item.description}</p>
              <p className='meal-item-actions'>
                <button className='button'>Add to cart</button>
              </p>
            </article>
          </li>
        );
      })}
      ;
    </ul>
  );
}
