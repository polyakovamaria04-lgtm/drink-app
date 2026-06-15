import { Selector } from "../../../../components/Selector/Selector";
import styles from "../AddDrinkForm/AddDrinkForm.module.scss";
const customStyles = {
  control: (base) => ({
    ...base,
    border: "none",
    boxShadow: "none",
  }),

  valueContainer: (base) => ({
    ...base,
    justifyContent: "flex-end",
  }),

  singleValue: (base) => ({
    ...base,
    marginLeft: "auto",
  }),

  placeholder: (base) => ({
    ...base,
    marginLeft: "auto",
  }),
  menu: (base) => ({
    ...base,
    width: "154px",
    left: "auto",
    right: 0,
  }),
};

export const AddDrinkForm = ({
  onFormChange,
  formData,
  categories = [],
  glasses = [],
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={formData.name || ""}
        onChange={(e) => onFormChange("name", e.target.value)}
        placeholder="Enter item title"
        className={styles.lineInput}
      />

      <input
        type="text"
        value={formData.description || ""}
        onChange={(e) => onFormChange("description", e.target.value)}
        placeholder="Enter about recipe"
        className={styles.lineInput}
      />

      <div className={styles.formRow}>
        <label className={styles.rowLabel}>Category</label>
        <div className={styles.selectContainer}>
          <Selector
            placeholder=""
            options={categories}
            value={formData.category}
            onChange={(value) => onFormChange("category", value)}
            customStyles={customStyles}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <label className={styles.rowLabel}>Glass</label>
        <div className={styles.selectContainer}>
          <Selector
            placeholder=""
            options={glasses}
            value={formData.glass}
            onChange={(value) => onFormChange("glass", value)}
            customStyles={customStyles}
          />
        </div>
      </div>

      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="alcoholicType"
            value="Alcoholic"
            checked={formData.type === "Alcoholic"}
            onChange={() => onFormChange("type", "Alcoholic")}
            className={styles.hiddenRadio}
          />
          <span className={styles.customRadio}></span>
          Alcoholic
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="alcoholicType"
            value="Non_Alcoholic"
            checked={formData.type === "Non_Alcoholic"}
            onChange={() => onFormChange("type", "Non_Alcoholic")}
            className={styles.hiddenRadio}
          />
          <span className={styles.customRadio}></span>
          Non-alcoholic
        </label>
      </div>
    </div>
  );
};
