import { useState, useEffect } from "react";
import axios from "axios";
import { NetworkIcons } from "../../components/NetworkIcons/NetworkIcons";
import { AddDrinkForm } from "./components/AddDrinkForm/AddDrinkForm";
import { ImageUploader } from "./components/ImageUploader/ImageUploader";
import styles from "../AddDrinks/AddDrinks.module.scss";
import { PopularDrinks } from "./components/PopularDrinks.jsx/PopularDrinks";
import { IngredientsSelector } from "./components/IngredientsSelector/IngredientsSelector";
import {
  DRINK_CATEGORIES,
  DRINK_GLASSES,
} from "./components/сonstants/drinkOptions";

export const AddDrinks = () => {
  const [ingredientsList, setIngredientsList] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    glass: "",
    type: "Alcoholic",
    ingredients: [
      { title: "", amount: "", measure: "cl" },
      { title: "", amount: "", measure: "cl" },
      { title: "", amount: "", measure: "cl" },
    ],
    recipe: "",
    imgUrl: "",
  });

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/drinks/ingredients-list",
        );
        setIngredientsList(res.data);
      } catch (error) {
        console.error("Error loading ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  const handleFormChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formattedIngredients = formData.ingredients
      .filter((ing) => ing.title.trim() !== "")
      .map((ing) => {
        const found = ingredientsList.find((item) => item.title === ing.title);
        return {
          ingredientId: found ? found._id : null,
          amount: ing.amount,
          measure: ing.measure,
        };
      })
      .filter((ing) => ing.ingredientId !== null);
    const dataToSend = {
      ...formData,
      ingredients: formattedIngredients,
    };

    if (
      !formData.name.trim() ||
      !formData.category ||
      !formData.glass ||
      !formData.recipe.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const hasValidIngredients = formData.ingredients.some(
      (ing) => ing.title.trim() !== "",
    );

    if (!hasValidIngredients) {
      alert("Please add at least one ingredient.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/drinks/own",
        dataToSend,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 201) {
        alert(" Cocktail added successfully!");

        setFormData({
          name: "",
          description: "",
          category: "",
          glass: "",
          type: "Alcoholic",
          ingredients: [
            { title: "", amount: "", measure: "cl" },
            { title: "", amount: "", measure: "cl" },
            { title: "", amount: "", measure: "cl" },
          ],
          recipe: "",
          imgUrl: "",
        });
      }
    } catch (error) {
      console.error("Error adding drink:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong while saving the drink.",
      );
    }
  };

  return (
    <div className={`${styles.wrapper} container`}>
      <section className={styles.formWrapper}>
        <h1>Add drink</h1>

        <form onSubmit={handleSubmit} className={styles.mainForm}>
          <div className={styles.upperSection}>
            <ImageUploader
              onUploadSuccess={(url) => handleFormChange("imgUrl", url)}
            />

            <AddDrinkForm
              formData={formData}
              onFormChange={handleFormChange}
              categories={DRINK_CATEGORIES}
              glasses={DRINK_GLASSES}
            />
          </div>

          <div className={styles.formRow}>
            <IngredientsSelector
              ingredientsList={ingredientsList}
              value={formData.ingredients}
              onChange={(updated) => handleFormChange("ingredients", updated)}
            />
          </div>

          <div className={styles.recipeContainer}>
            <h2>Recipe Preparation</h2>

            <textarea
              value={formData.recipe}
              onChange={(e) => handleFormChange("recipe", e.target.value)}
              placeholder="Enter the recipe"
              className={styles.recipeTextarea}
            />

            <button type="submit" className={styles.submitBtn}>
              Add
            </button>
          </div>
        </form>
      </section>

      <section className={styles.addictional}>
        <NetworkIcons />
        <PopularDrinks />
      </section>
    </div>
  );
};
