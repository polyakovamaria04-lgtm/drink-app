import { useEffect } from "react";
import { createPortal } from "react-dom";
import CrossIcon from "@/assets/svg/just-icons/cross.svg?react";
import styles from "./Modal.module.scss";

export const Modal = ({ isOpen, onClose, children, variant }) => {
  const modalContentClass = `${styles.modalContent} ${variant ? styles[variant] : ""}`;
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={modalContentClass} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          <CrossIcon />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
