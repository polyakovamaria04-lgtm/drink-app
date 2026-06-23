import styles from "./DrinksGrid.module.scss";

export const DrinksGrid = ({
  children,
  className = "",
  variant = "default",
}) => {
  const variantClass =
    variant === "drinksPage"
      ? styles.drinksPageGrid
      : variant === "homeGrid"
        ? styles.homeGrid
        : "";
  return (
    <div
      className={`
        ${styles.grid}
        ${variantClass}
        ${className}
      `}>
      {children}
    </div>
  );
};
