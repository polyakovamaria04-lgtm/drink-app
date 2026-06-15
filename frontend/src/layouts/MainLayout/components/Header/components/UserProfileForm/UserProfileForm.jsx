import { useState, useRef } from "react";
import styles from "./UserProfileForm.module.scss";
import PencilIcon from "@/assets/svg/just-icons/pencil.svg?react";
import LightBlur from "@/assets/svg/background/lightEllipce.svg?react";
import BlueBlur from "@/assets/svg/background/blueEllipce.svg?react";

import { Avatar } from "@/assets/Svg/Avatar/Avatar.jsx";

export const UserProfileForm = ({ currentUser, onSave }) => {
  const [name, setName] = useState(currentUser?.name || "");
  const [avatarPreview, setAvatarPreview] = useState(
    currentUser?.avatarURL || "",
  );
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    onSave(formData);
  };

  return (
    <div className={styles.blurWrapper}>
      <div className={styles.blur}>
        <LightBlur className={styles.blurLight} />
        <BlueBlur className={styles.blurBlue} />
      </div>

      <form onSubmit={handleSubmit} className={styles.profileForm}>
        <div
          className={styles.avatarContainer}
          onClick={() => fileInputRef.current.click()}>
          <div className={styles.avatarWrapper}>
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="User avatar"
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <Avatar style={{ width: "100px", height: "100px" }} />
              </div>
            )}
            <div className={styles.plusIcon}>+</div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className={styles.hiddenFileInput}
          />
        </div>

        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={styles.nameInput}
            required
          />

          <PencilIcon className={styles.pencilIcon} />
        </div>

        <button type="submit" className={styles.saveBtn}>
          Save changes
        </button>
      </form>
    </div>
  );
};
