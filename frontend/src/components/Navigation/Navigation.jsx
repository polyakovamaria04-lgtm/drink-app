import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";
export const Navigation = ({
  variant = "header",
  className = "",
  onLinkClick,
}) => {
  const variantClass =
    variant === "footer"
      ? styles.footerVariant
      : variant === "mobile"
        ? styles.mobileVariant
        : styles.headerVariant;

  return (
    <div
      className={`
        ${styles.navigationContainer}
        ${variantClass}
        ${className}
      `}>
      <NavLink to="/" className={styles.link} onClick={onLinkClick}>
        Home
      </NavLink>
      <NavLink to="/drinks" className={styles.link} onClick={onLinkClick}>
        Drinks
      </NavLink>
      <NavLink to="/add-drink" className={styles.link} onClick={onLinkClick}>
        Add drink
      </NavLink>
      <NavLink to="/my-drinks" className={styles.link} onClick={onLinkClick}>
        My drinks
      </NavLink>
      <NavLink to="/favorites" className={styles.link} onClick={onLinkClick}>
        Favorites
      </NavLink>
    </div>
  );
};
