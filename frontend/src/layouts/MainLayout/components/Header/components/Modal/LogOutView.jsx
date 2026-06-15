import axios from "axios";
import styles from "./Modal.module.scss";

export const LogOutView = ({ onClose, onLogoutSuccess }) => {
  const processLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      console.error("Backend logout failed, clean client anyway", error);
    } finally {
      localStorage.removeItem("token");
      onLogoutSuccess();
    }
  };

  return (
    <div className={styles.logoutBox}>
      <p>Are you sure you want to log out?</p>
      <div className={styles.actions}>
        <button onClick={processLogout} className={styles.confirmBtn}>
          Log out
        </button>
        <button onClick={onClose} className={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  );
};
