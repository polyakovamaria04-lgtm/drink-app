import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PopularDrinks.module.scss";

export const PopularDrinks = () => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/drinks/popular`,
        );

        setDrinks(
          Array.isArray(response.data) ? response.data.slice(0, 4) : [],
        );
      } catch (error) {
        console.error("Error loading popular cocktails:", error);
      }
    };

    fetchPopular();
  }, []);

  return (
    <div className={styles.popularContainer}>
      <h3 className={styles.title}>Popular drinks</h3>

      <ul className={styles.drinkList}>
        {drinks.map(({ _id, name, imgUrl, description }) => (
          <li key={_id} className={styles.drinkItem}>
            <img
              src={
                imgUrl ||
                "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=200"
              }
              alt={name}
              className={styles.drinkImage}
            />

            <div className={styles.drinkInfo}>
              <h4 className={styles.drinkName}>{name}</h4>
              <p className={styles.drinkDescription}>
                {description && description.length > 75
                  ? `${description.substring(0, 75)}...`
                  : description || "No description available"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
