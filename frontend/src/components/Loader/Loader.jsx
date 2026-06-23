import styles from "../Loader/Loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.spinner}></div>
    </div>
  );
};
