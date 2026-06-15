import styles from "./SubscribeForm.module.scss";
import { useState } from "react";

export const SubscribeForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Підписка на емейл:", email);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="email"
        placeholder="Enter the email"
        aria-label="Email address for newsletter"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
        required></input>
      <button type="submit" className={styles.button}>
        Subscribe
      </button>
    </form>
  );
};
