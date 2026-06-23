import styles from "../DrinksPage/DrinksPage.module.scss";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { DrinksGrid } from "../../components/DrinksGrid/DrinksGrid";
import { DrinkCard } from "../../components/DrinkCard/DrinkCard";
import SearchIcon from "../../assets/svg/just-icons/search.svg?react";
import Arrow from "../../assets/svg/just-icons/arrow.svg?react";
import { Selector } from "../../components/Selector/Selector";
import { EmptyPage } from "../EmptyPage/EmptyPage";

export const DrinksPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [selectedIngredient, setSelectedIngredient] = useState("");

  const categories = [
    "All categories",
    "Ordinary Drink",
    "Cocktail",
    "Shake",
    "Other/Unknown",
    "Cocoa",
    "Shot",
    "Coffee / Tea",
    "Homemade Liqueur",
    "Punch / Party Drink",
    "Beer",
    "Soft Drink",
  ];
  const { data: ingredients = [] } = useQuery({
    queryKey: ["ingredients"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/drinks/ingredients-list",
      );

      return data;
    },
  });

  const { data, isError, error, isPending } = useQuery({
    queryKey: [
      "drinks",
      currentPage,
      searchQuery,
      selectedCategory,
      selectedIngredient,
    ],

    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/api/drinks", {
        params: {
          page: currentPage,
          limit: 10,
          search: searchQuery,
          category:
            selectedCategory === "All categories" ? "" : selectedCategory,
          ingredientId: selectedIngredient,
        },
      });
      return data;
    },
  });
  const ingredientOptions = ingredients.map((ingredient) => ({
    value: ingredient._id,
    label: ingredient.title,
  }));

  const drinks = data?.drinks || [];
  const totalPages = data?.totalPages || 1;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const renderPaginationButtons = () => {
    const pages = [];

    let startPage = Math.max(1, currentPage - 3);
    let endPage = Math.min(totalPages, startPage + 7);

    if (endPage - startPage < 7) {
      startPage = Math.max(1, endPage - 7);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageBtn} ${
            currentPage === i ? styles.activePage : ""
          }`}
          onClick={() => setCurrentPage(i)}>
          {i}
        </button>,
      );
    }

    return pages;
  };

  if (isError) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }

  if (isPending) {
    return (
      <div className="container">
        <EmptyPage />
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className={styles.drinksTitle}>Drinks</h1>

      <div className={styles.filterBar}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter the text"
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />

          <SearchIcon className={styles.searchIcon} />
        </div>

        <Selector
          options={categories}
          value={selectedCategory}
          onChange={(value) => {
            setSelectedCategory(value);
            setCurrentPage(1);
          }}
          customStyles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#161F37",
              border: "none",
              boxShadow: "none",

              "&:hover": {
                border: "none",
              },
            }),
          }}
          placeholder="All categories"
          width="199px"
        />

        <Selector
          options={ingredientOptions}
          value={selectedIngredient}
          onChange={(value) => {
            setSelectedIngredient(value);
            setCurrentPage(1);
          }}
          customStyles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#161F37",
              border: "none",
              boxShadow: "none",

              "&:hover": {
                border: "none",
              },
            }),
          }}
          placeholder="Ingredients"
          width="199px"
        />
      </div>

      {!isPending &&
        (drinks.length > 0 ? (
          <section className={styles.gridSection}>
            <DrinksGrid variant="drinksPage">
              {drinks.map((drink) => (
                <DrinkCard
                  key={drink._id}
                  drink={drink}
                  showSeeMore={true}
                  variant="standart"
                />
              ))}
            </DrinksGrid>
          </section>
        ) : (
          <EmptyPage message={" No drinks found. Try changing filters!"} />
        ))}

      {totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <button
            className={styles.arrowBtn}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}>
            <Arrow />
          </button>

          {renderPaginationButtons()}

          <button
            className={styles.arrowBtn}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}>
            <Arrow className={styles.arrow} />
          </button>
        </div>
      )}
    </div>
  );
};
