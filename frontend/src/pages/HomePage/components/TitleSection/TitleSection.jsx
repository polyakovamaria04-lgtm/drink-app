import styles from "../TitleSection/TitleSection.module.scss";
import heroImage1x from "@/assets/images/design/hero.png";
import heroImage2x from "@/assets/images/design/hero@2x.png";

export const TitleSection = () => {
  return (
    <div className={styles.TitleSection}>
      <div className={styles.TextArea}>
        <h1>Craft Your Perfect Drink with Drink Master</h1>
        <p>
          Unlock your inner mixologist with Drink Master, your one-stop
          destination for exploring, crafting, and mastering the world's finest
          beverages.
        </p>
        <button className={styles.button} type="button">
          Add drink
        </button>
      </div>
      <img
        className={styles.image}
        src={heroImage1x}
        srcSet={`${heroImage1x} 1x, ${heroImage2x} 2x`}
      />
    </div>
  );
};
