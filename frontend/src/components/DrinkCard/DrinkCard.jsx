import styles from "./DrinkCard.module.scss";
import { Link } from "react-router-dom";

export const DrinkCard = ({
  drink,
  showCategory = false,
  showSeeMore = false,
  onDelete,
  showDetails = false,
  variant = "default",
}) => {
  const cardStyles = `${styles.card} ${variant === "popular" ? styles.popularVariant : ""} ${variant === "favorites" ? styles.favorites : ""}`;

  return (
    <div className={cardStyles}>
      <img src={drink.imgUrl} alt={drink.name} className={styles.image} />

      <div className={styles.content}>
        {showCategory && (
          <span className={styles.category}>{drink.category}</span>
        )}
        <h3 className={styles.name}>{drink.name}</h3>

        {showDetails && (
          <div className={styles.details}>
            <p className={styles.alcoholic}>{drink.type}</p>
            <p className={styles.description}>{drink.description}</p>
          </div>
        )}

        <div className={styles.actions}>
          {showSeeMore && (
            <Link
              to={`/drinks/${drink._id}`}
              className={`${styles.seeMoreBtn} ${variant === "favorites" ? styles.favSeeMore : ""}`}>
              See more
            </Link>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className={`${styles.deleteBtn} ${variant === "favorites" ? styles.favDelete : ""}`}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 7H20M10 11V17M14 11V17M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7"
                  stroke="#F3F3F3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
