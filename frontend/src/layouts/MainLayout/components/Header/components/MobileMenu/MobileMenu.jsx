import styles from "../MobileMenu/MobileMenu.module.scss";
import { Navigation } from "../../../../../../components/Navigation/Navigation";
import CrossIcon from "@/assets/svg/just-icons/cross.svg?react";
import { Logo } from "../../../../../../components/Logo/Logo";
import { ThemeToggler } from "../ThemeToggler/ThemeToggler";
import { useEffect } from "react";

export const MobileMenu = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div className={`${styles.mobileMenu} container`}>
      <div className={styles.header}>
        <Logo />
        <div className={styles.wrapper}>
          <ThemeToggler />
          <button className={styles.cross} onClick={onClose}>
            <CrossIcon />
          </button>
        </div>
      </div>

      <Navigation
        variant="mobile"
        className="navMobile"
        onLinkClick={onClose}
      />
    </div>
  );
};
