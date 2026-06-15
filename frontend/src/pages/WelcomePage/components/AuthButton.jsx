import styles from "../components/FormStyles.module.scss";

export const AuthButton = ({ children, type = "submit", onClick }) => {
  return (
    <button type={type} onClick={onClick} className={styles.authBtn}>
      {children}
    </button>
  );
};
