import { useState, useEffect } from "react";
import axios from "axios";
import { EmptyPage } from "../EmptyPage/EmptyPage";
import { DrinkCard } from "../../components/DrinkCard/DrinkCard";
import styles from "../Favourites/Favourites.module.scss";

export const Favorites = () => {
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "http://localhost:5000/api/drinks/favorite",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Favorites response:", data);

        setDrinks(Array.isArray(data) ? data : data.favorites || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setDrinks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/drinks/favorite/remove/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setDrinks((prev) => prev.filter((drink) => drink._id !== id));
    } catch (error) {
      console.error(error);
      alert("Unable to delete the drink from favorites");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log("drinks:", drinks);

  return (
    <div className="container">
      <h1 className={styles.title}>Favorites</h1>

      {drinks.length === 0 ? (
        <EmptyPage message="You haven't added any favorite cocktails yet" />
      ) : (
        <ul className={styles.drinksList}>
          {drinks.map((drink, index) => {
            console.log("drink:", drink);

            return (
              <li key={drink._id || drink.id || index}>
                <DrinkCard
                  showDetails={true}
                  drink={drink}
                  showSeeMore
                  onDelete={() => handleDelete(drink._id)}
                  variant="favorites"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
