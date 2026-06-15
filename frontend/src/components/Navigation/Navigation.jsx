import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";

export const Navigation = ({ variant = "header" }) => {
  const variantClass =
    variant === "footer" ? styles.footerVariant : styles.headerVariant;
  return (
    <div className={`${styles.navigationContainer} ${variantClass}`}>
      <NavLink to="/" className={styles.link}>
        Home
      </NavLink>
      <NavLink to="/drinks" className={styles.link}>
        Drinks
      </NavLink>
      <NavLink to="/add-drink" className={styles.link}>
        Add drink
      </NavLink>
      <NavLink to="/my-drinks" className={styles.link}>
        My drinks
      </NavLink>
      <NavLink to="/favorites" className={styles.link}>
        Favorites
      </NavLink>
    </div>
  );
};
