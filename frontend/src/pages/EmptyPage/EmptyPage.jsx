import styles from "./EmptyPage.module.scss";

export const EmptyPage = ({ message }) => {
  return (
    <div className={styles.wrapper}>
      <img src="/src/assets/images/design/hero.png" alt="Hero" />

      <p>{message}</p>
    </div>
  );
};
