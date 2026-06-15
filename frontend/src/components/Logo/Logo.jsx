import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <svg
        className={styles.icon}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.13 0h-12.26l-9.87 9.87v12.26l9.87 9.87h12.26l9.87-9.87v-12.26l-9.87-9.87zM11.566 22.284l-6.323-6.323 6.323-6.323c2.39-2.39 6.323-2.39 8.713 0l6.323 6.323-6.323 6.323c-2.39 2.39-6.246 2.39-8.713 0z"
          fill="currentColor"
        />
      </svg>
      <span className={styles.text}>Drink Master</span>
    </div>
  );
};
