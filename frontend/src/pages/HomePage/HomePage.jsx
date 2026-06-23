import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import styles from "../HomePage/HomePage.module.scss";
import { TitleSection } from "./components/TitleSection/TitleSection";
import { DrinksGrid } from "../../components/DrinksGrid/DrinksGrid";
import { DrinkCard } from "../../components/DrinkCard/DrinkCard";

export const HomePage = () => {
  const { data, isError, error } = useQuery({
    queryKey: ["drinks"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:5000/api/drinks?limit=200",
      );
      return response.data.drinks;
    },
    staleTime: 1000 * 60 * 5,
  });

  const getDiverseDrinks = (allDrinks, targetCategory, isOther = false) => {
    if (!allDrinks) return [];

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
      if (!letterCounter[firstLetter]) letterCounter[firstLetter] = 0;

      if (letterCounter[firstLetter] < 2) {
        result.push(drink);
        letterCounter[firstLetter] += 1;
      }
    }
    return result;
  };

  if (isError) return <div>Error loading drinks: {error.message}</div>;

  const drinks = data || [];
  return (
    <div className="container">
      <TitleSection />

      <CategorySection
        title="Ordinary Drink"
        drinks={getDiverseDrinks(drinks, "Ordinary Drink")}
      />
      <CategorySection
        title="Cocktail"
        drinks={getDiverseDrinks(drinks, "Cocktail")}
      />
      <CategorySection
        title="Shake"
        drinks={getDiverseDrinks(drinks, "Shake")}
      />
    </div>
  );
};

const CategorySection = ({ title, drinks }) => {
  if (!drinks || drinks.length === 0) return null;
  return (
    <section className={styles.categorySection}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      <DrinksGrid variant="homeGrid">
        {drinks.map((drink) => (
          <DrinkCard
            variant="standart"
            key={drink._id}
            drink={drink}
            showSeeMore
          />
        ))}
      </DrinksGrid>
    </section>
  );
};
