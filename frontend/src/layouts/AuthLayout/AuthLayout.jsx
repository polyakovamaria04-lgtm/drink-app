import { Outlet } from "react-router-dom";
import blueEllipse from "@/assets/svg/background/blueEllipce.svg";
import lightEllipse from "@/assets/svg/background/lightEllipce.svg";
import styles from "../AuthLayout/AuthLayout.module.scss";
export const AuthLayout = () => {
  return (
    <div className={styles.authWrapper}>
      <div className={styles.blurWrapper}>
        <img src={blueEllipse} className={styles.blueEllipse} alt="decor" />
        <img src={lightEllipse} className={styles.ligthEllipse} alt="decor" />

        <Outlet />
      </div>

      <div className={styles.backgroundContainer}></div>
    </div>
  );
};
