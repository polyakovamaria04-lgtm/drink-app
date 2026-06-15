import styles from "../WelcomePage/Welcome.module.scss";
import { Link } from "react-router-dom";

export const WelcomePage = () => {
  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.title}>Welcome to the app!</h1>
      <p>
        This app offers more than just a collection of recipes - it is designed
        to be your very own digital cookbook. You can easily save and retrieve
        your own recipes at any time.
      </p>
      <div className={styles.buttonsWrapper}>
        <Link to="/register" className={styles.signUp}>
          Sign Up
        </Link>
        <Link to="/login" className={styles.login}>
          Sign In
        </Link>
      </div>
    </div>
  );
};
