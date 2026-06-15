import { useState, useEffect } from "react";
import axios from "axios";
import { EmptyPage } from "../EmptyPage/EmptyPage";
import { DrinkCard } from "../../components/DrinkCard/DrinkCard";

export const MyDrinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyDrinks = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "http://localhost:5000/api/drinks/own",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setDrinks(Array.isArray(data) ? data : data.drinks || []);
      } catch (error) {
        console.error("Error retrieving beverages:", error);
        setDrinks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyDrinks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/drinks/own/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDrinks((prev) => prev.filter((drink) => drink._id !== id));
    } catch (error) {
      alert("Unable to delete the drink");
      console.error(error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>My Drinks</h1>

      {drinks.length === 0 ? (
        <EmptyPage message="You haven't added any of your cocktails yet" />
      ) : (
        <ul className="drinks-list">
          {drinks.map((drink) => (
            <li key={drink._id}>
              <DrinkCard
                showDetails={true}
                drink={drink}
                showSeeMore
                onDelete={() => handleDelete(drink._id)}
                variant="favorites"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
