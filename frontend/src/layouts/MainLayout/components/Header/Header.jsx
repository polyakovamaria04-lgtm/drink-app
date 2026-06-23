import { Logo } from "../../../../components/Logo/Logo";
import { Navigation } from "../../../../components/Navigation/Navigation";
import styles from "./Header.module.scss";
import { ThemeToggler } from "./components/ThemeToggler/ThemeToggler";
import { UserArea } from "./components/UserArea/UserArea";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MobileMenu } from "./components/MobileMenu/MobileMenu";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className={`${styles.headerContainer} container`}>
        <Link to="/">
          <Logo />
        </Link>
        <Navigation className={styles.desktopNav} variant="header" />

        <div className={styles.wrapper}>
          <ThemeToggler
            className={`${styles.navMenu} ${isOpen ? styles.active : ""}`}
          />
          <UserArea />

          <button className={styles.burgerIcon} onClick={() => setIsOpen(true)}>
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M33.25 15.8333H4.75"
                stroke="#F3F3F3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M33.25 9.5H4.75"
                stroke="#F3F3F3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M33.25 22.1667H4.75"
                stroke="#F3F3F3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M33.25 28.5H4.75"
                stroke="#F3F3F3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}
      </div>
      <div className={styles.line}></div>
    </header>
  );
};
