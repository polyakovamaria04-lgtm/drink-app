import styles from "./EmptyPage.module.scss";
import heroImg from "../../assets/images/design/hero.png";

export const EmptyPage = ({ message }) => {
  return (
    <div className={styles.wrapper}>
      <img src={heroImg} alt="Hero" />
      <p>{message}</p>
    </div>
  );
};
