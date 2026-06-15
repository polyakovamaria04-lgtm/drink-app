import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import styles from "../HomePage/HomePage.module.scss";
import { TitleSection } from "./components/TitleSection/TitleSection";
import { DrinksGrid } from "../../components/DrinksGrid/DrinksGrid";
import { DrinkCard } from "../../components/DrinkCard/DrinkCard";

export const HomePage = () => {
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllDrinks = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/drinks?limit=200",
        );
        setDrinks(response.data.drinks);
      } catch (error) {
        console.error("Error:", error);
      }

      setIsLoading(false);
    };

    getAllDrinks();
  }, []);

  const isArray = Array.isArray(drinks);

  const getDiverseDrinks = (allDrinks, targetCategory, isOther = false) => {
    if (!allDrinks || allDrinks.length === 0) return [];

    const categoryDrinks = allDrinks.filter((drink) => {
      if (isOther) {
        return (
          drink.category !== "Ordinary Drink" &&
          drink.category !== "Cocktail" &&
          drink.category !== "Shake"
        );
      }
      return drink.category === targetCategory;
    });

    const shuffledDrinks = [...categoryDrinks].sort(() => 0.5 - Math.random());

    const result = [];
    const letterCounter = {};

    for (const drink of shuffledDrinks) {
      if (result.length >= 3) break;

      const firstLetter = drink.name.charAt(0).toUpperCase();

      if (!letterCounter[firstLetter]) {
        letterCounter[firstLetter] = 0;
      }

      if (letterCounter[firstLetter] < 2) {
        result.push(drink);
        letterCounter[firstLetter] += 1;
      }
    }

    if (result.length < 3 && categoryDrinks.length >= 3) {
      for (const drink of shuffledDrinks) {
        if (result.length >= 3) break;
        if (!result.find((r) => r._id === drink._id)) {
          result.push(drink);
        }
      }
    }

    return result;
  };

  const ordinaryDrinks = isArray
    ? getDiverseDrinks(drinks, "Ordinary Drink")
    : [];
  const cocktails = isArray ? getDiverseDrinks(drinks, "Cocktail") : [];
  const shakes = isArray ? getDiverseDrinks(drinks, "Shake") : [];
  const otherDrinks = isArray ? getDiverseDrinks(drinks, "", true) : [];

  if (isLoading) {
    return <div className={styles.loader}>Loading your bar... 🍹</div>;
  }

  return (
    <div className="container">
      <TitleSection />

      <div>
        {ordinaryDrinks.length > 0 && (
          <section className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>Ordinary Drink</h2>
            <DrinksGrid>
              {ordinaryDrinks.map((drink) => (
                <DrinkCard key={drink._id} drink={drink} showSeeMore={true} />
              ))}
            </DrinksGrid>
          </section>
        )}

        {cocktails.length > 0 && (
          <section className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>Cocktail</h2>
            <DrinksGrid>
              {cocktails.map((drink) => (
                <DrinkCard key={drink._id} drink={drink} showSeeMore={true} />
              ))}
            </DrinksGrid>
          </section>
        )}

        {shakes.length > 0 && (
          <section className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>Shake</h2>
            <DrinksGrid>
              {shakes.map((drink) => (
                <DrinkCard key={drink._id} drink={drink} showSeeMore={true} />
              ))}
            </DrinksGrid>
          </section>
        )}

        {otherDrinks.length > 0 && (
          <section className={styles.otherCategorySection}>
            <h2 className={styles.categoryTitle}>Other/Unknown</h2>
            <DrinksGrid>
              {otherDrinks.map((drink) => (
                <DrinkCard key={drink._id} drink={drink} showSeeMore={true} />
              ))}
            </DrinksGrid>

            <div className={styles.moreBtnWrapper}>
              <Link to="/drinks/other" className={styles.otherDrinksBtn}>
                Other drinks
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
