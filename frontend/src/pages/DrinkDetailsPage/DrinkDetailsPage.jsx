import { useParams } from "react-router-dom";
import api from "../../api/api";
import styles from "./DrinkDetailsPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { EmptyPage } from "../EmptyPage/EmptyPage";

export const DrinkDetailsPage = () => {
  const { id } = useParams();

  const {
    data: drink,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["drink", id],
    queryFn: async () => {
      const response = await api.get(`/drinks/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const handleAddToFavorites = async () => {
    try {
      await api.patch(`/drinks/favorite/add/${id}`);
      alert("The drink has been added to your favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Unable to add to favorites. Please login.");
    }
  };

  if (isLoading) return <EmptyPage message={" "} />;
  if (isError || !drink)
    return <EmptyPage message={" Error or Drink not found!"} />;
  return (
    <div className="container">
      <section className={styles.heroSection}>
        <div className={styles.info}>
          <h1>{drink.name}</h1>
          <p className={styles.meta}>
            {drink.glass} / {drink.type}
          </p>
          <p className={styles.description}>{drink.description}</p>
          <button className={styles.favBtn} onClick={handleAddToFavorites}>
            Add to favorite drinks
          </button>
        </div>
        <div className={styles.mainImageWrapper}>
          <img src={drink.imgUrl} alt={drink.name} className={styles.mainImg} />
        </div>
      </section>

      <section className={styles.ingredientsSection}>
        <h2>Ingredients</h2>
        <div className={styles.ingredientsWrapper}>
          {drink.ingredients?.map((item, index) => {
            const ingName = item.ingredientId?.title || "Unknown Ingredient";
            const ingThumb =
              item.ingredientId?.thumbUrl || "/images/placeholder.png";

            return (
              <div key={index} className={styles.ingredientCard}>
                <img
                  src={ingThumb}
                  alt={ingName}
                  onError={(e) => {
                    e.target.src = "/images/placeholder.png";
                  }}
                />
                <div className={styles.ingMeta}>
                  <span>{ingName}</span>
                  <span>{item.amount} g/ml</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.recipeSection}>
        <h2>Recipe Preparation</h2>
        <div className={styles.recipeContent}>
          <img
            src={drink.imgUrl}
            alt={drink.name}
            className={styles.staticRecipeImg}
          />
          <div className={styles.recipeText}>
            {drink.recipe?.split("\n").map((step, i) => (
              <p key={i}>{step}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DrinkDetailsPage;
