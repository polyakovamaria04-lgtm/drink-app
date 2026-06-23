import styles from "./Footer.module.scss";
import { Logo } from "../../../../components/Logo/Logo";
import { NetworkIcons } from "../../../../components/NetworkIcons/NetworkIcons";
import { Navigation } from "../../../../components/Navigation/Navigation";
import { SubscribeForm } from "./components/SubscribeForm/SubscribeForm";

export const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={`${styles.footer} container`}>
        <div className={styles.firstContainer}>
          <div className={styles.logoWrapper}>
            <Logo />
            <NetworkIcons />
          </div>

          <Navigation variant="footer" />
        </div>
        <div className={styles.latestContainer}>
          <p className={styles.formText}>
            Subscribe up to our newsletter. Be in touch with latest news and
            special offers, etc.
          </p>
          <SubscribeForm />
        </div>
      </div>
      <div className={`${styles.legacy} container`}>
        <span>©2026 Drink Master. All rights reserved.</span>
        <div className={styles.privacy}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </div>
  );
};
