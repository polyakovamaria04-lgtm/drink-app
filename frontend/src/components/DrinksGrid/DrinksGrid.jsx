import styles from "./DrinksGrid.module.scss";

export const DrinksGrid = ({ children }) => {
  return <div className={styles.grid}>{children}</div>;
};
