import { DrinkCard } from "../../../../components/DrinkCard/DrinkCard";
import styles from "./PreviewDrinks.module.scss";
import { useEffect, useState } from "react";

import { getDrinksByCategory } from "../../../../api/cocktailService";

export const PreviewDrinks = () => {
  const [ordinaryDrinks, setOrdinaryDrinks] = useState([]);

  useEffect(() => {
    getDrinksByCategory("Ordinary Drink")
      .then((data) => setOrdinaryDrinks(data))
      .catch((error) => console.error("Помилка завантаження:", error));
  }, []);

  return (
    <div className={styles.grid}>
      {ordinaryDrinks.map((drink) => (
        <DrinkCard
          key={drink.idDrink}
          image={drink.strDrinkThumb}
          name={drink.strDrink}
        />
      ))}
    </div>
  );
};
