import styles from "./IngredientsSelector.module.scss";

export const LocalSelector = ({
  options = [],
  value,
  onChange,
  placeholder = "Select",
  isOpen,
  onToggle,
}) => {
  const filtered = options.filter((opt) =>
    (opt.title || opt).toLowerCase().includes(value?.toLowerCase() || ""),
  );

  return (
    <div className={styles.selectorWrapper}>
      <div className={styles.selectorField}>
        <input
          autoComplete="new-password"
          type="text"
          className={styles.selectorInput}
          value={value || ""}
          placeholder={placeholder}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val);
          }}
          onFocus={onToggle}
        />

        <span
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
          onClick={onToggle}>
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
            <path
              d="M11 1L6 6L1 1"
              stroke="#F3F3F3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {isOpen && filtered.length > 0 && (
        <ul className={styles.optionsList}>
          {filtered.map((opt, i) => (
            <li
              key={i}
              className={styles.optionItem}
              onMouseDown={() => {
                onChange(opt.title || opt);
              }}>
              {opt.title || opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
