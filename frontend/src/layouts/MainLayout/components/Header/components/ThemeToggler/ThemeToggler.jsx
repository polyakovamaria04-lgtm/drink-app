import styles from "./ThemeToggler.module.scss";

export const ThemeToggler = () => {
  return (
    <div className={styles.ThemeToggler}>
      <label className={styles.switch}>
        <input type="checkbox" id="ThemeToggler"></input>
      </label>
      <span className={styles.slider}></span>
    </div>
  );
};
