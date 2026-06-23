import { useState, useEffect, useRef } from "react";
import { LocalSelector } from "./LocalSelector";
import styles from "./IngredientsSelector.module.scss";
import CrossIcon from "@/assets/svg/just-icons/cross.svg?react";

export const IngredientsSelector = ({ value = [], onChange }) => {
  const wrapperRef = useRef(null);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  // fetch ingredients
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list",
        );
        const data = await response.json();

        const formatted = data.drinks.map((item) => ({
          title: item.strIngredient1,
        }));

        setIngredientsList(formatted);
      } catch (error) {
        console.error("Error while loading ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  // click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUpdate = (index, key, val) => {
    const updated = value.map((item, i) =>
      i === index ? { ...item, [key]: val } : item,
    );
    onChange(updated);
  };

  const adjustCount = (delta) => {
    const newCount = value.length + delta;
    if (newCount < 0) return;

    if (delta > 0) {
      onChange([...value, { title: "", amount: "" }]);
    } else {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div ref={wrapperRef} className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ingredients</h2>

        <div className={styles.counter}>
          <button type="button" onClick={() => adjustCount(-1)}>
            -
          </button>
          <span>{value.length}</span>
          <button type="button" onClick={() => adjustCount(1)}>
            +
          </button>
        </div>
      </div>

      <div className={styles.list}>
        {value.map((item, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.wrapper}>
              <div className={styles.selector}>
                <LocalSelector
                  autoComplete="new-password"
                  options={ingredientsList}
                  value={item.title}
                  onChange={(val) => handleUpdate(index, "title", val)}
                  placeholder="Select ingredient"
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              </div>

              <input
                type="text"
                className={styles.amountInput}
                value={item.amount || ""}
                onChange={(e) => handleUpdate(index, "amount", e.target.value)}
                placeholder="0 cl"
              />
            </div>

            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => onChange(value.filter((_, i) => i !== index))}>
              <CrossIcon className={styles.CrossIcon} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
