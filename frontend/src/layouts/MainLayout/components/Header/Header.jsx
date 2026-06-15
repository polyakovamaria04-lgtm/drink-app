import { Logo } from "../../../../components/Logo/Logo";
import { Navigation } from "../../../../components/Navigation/Navigation";
import styles from "./Header.module.scss";
import { ThemeToggler } from "./components/ThemeToggler/ThemeToggler";
import { UserArea } from "./components/UserArea/UserArea";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className={`${styles.header} container`}>
      <div className={styles.headerContainer}>
        <Link to="/">
          <Logo />
        </Link>
        <Navigation variant="header" />
        <div className={styles.wrapper}>
          <ThemeToggler />
          <UserArea />
        </div>
      </div>
    </header>
  );
};
