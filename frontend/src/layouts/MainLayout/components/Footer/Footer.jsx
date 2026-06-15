import styles from "./Footer.module.scss";
import { Logo } from "../../../../components/Logo/Logo";
import { NetworkIcons } from "../../../../components/NetworkIcons/NetworkIcons";
import { Navigation } from "../../../../components/Navigation/Navigation";
import { SubscribeForm } from "./components/SubscribeForm/SubscribeForm";

export const Footer = () => {
  return (
    <div className={`${styles.footerWrapper} container`}>
      <div className={styles.footer}>
        <div className={styles.firstContainer}>
          <Logo />
          <NetworkIcons />
          <span className={styles.info}>
            ©2026 Drink Master. All rights reserved.
          </span>
        </div>
      </div>
      <Navigation variant="footer" />
      <div className={styles.latestContainer}>
        <p className={styles.formText}>
          Subscribe up to our newsletter. Be in touch with latest news and
          special offers, etc.
        </p>
        <SubscribeForm />
      </div>
    </div>
  );
};
