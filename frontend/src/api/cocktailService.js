тзimport axios from "axios";

export const getDrinksByCategory = async (category) => {
  const response = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
  );
  return response.data.drinks.slice(0, 3);
};
