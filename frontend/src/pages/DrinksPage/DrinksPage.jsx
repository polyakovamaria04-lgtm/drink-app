import styles from "../DrinksPage/DrinksPage.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { DrinksGrid } from "../../components/DrinksGrid/DrinksGrid";
import { DrinkCard } from "../../components/DrinkCard/DrinkCard";
import SearchIcon from "../../assets/svg/just-icons/search.svg?react";

export const DrinksPage = () => {
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");

  const [isSelectOpen, setIsSelectOpen] = useState(false);

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

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `http://localhost:5000/api/drinks?page=${currentPage}&limit=9&search=${searchQuery}&category=${selectedCategory}`,
        );

        setDrinks(response.data.drinks);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching drinks with pagination:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrinks();
  }, [currentPage, searchQuery, selectedCategory]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const renderPaginationButtons = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageBtn} ${currentPage === i ? styles.activePage : ""}`}
          onClick={() => setCurrentPage(i)}>
          {i}
        </button>,
      );
    }
    return pages;
  };

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
          <SearchIcon className={styles.searchIcon}></SearchIcon>
        </div>
        <div
          className={`${styles.selectWrapper} ${isSelectOpen ? styles.isOpen : ""}`}>
          <select
            value={selectedCategory}
            onChange={(e) => {
              handleCategoryChange(e.target.value);
              setIsSelectOpen(false);
            }}
            onClick={() => setIsSelectOpen((prev) => !prev)}
            onBlur={() => setIsSelectOpen(false)}
            className={styles.categorySelect}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loader}>Loading drinks... 🧊</div>
      ) : drinks.length > 0 ? (
        <section className={styles.gridSection}>
          <DrinksGrid>
            {drinks.map((drink) => (
              <DrinkCard key={drink._id} drink={drink} showSeeMore={true} />
            ))}
          </DrinksGrid>
        </section>
      ) : (
        <div className={styles.noResults}>
          No drinks found. Try changing filters! 🤷‍♂️
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <button
            className={styles.arrowBtn}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}>
            &lt;
          </button>

          {renderPaginationButtons()}

          <button
            className={styles.arrowBtn}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};
