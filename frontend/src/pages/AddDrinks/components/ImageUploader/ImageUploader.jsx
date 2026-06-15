import { useState } from "react";
import axios from "axios";
import styles from "./ImageUploader.module.scss";

export const ImageUploader = ({ onUploadSuccess }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const CLOUD_NAME = "dmx6a3jin";
  const UPLOAD_PRESET = "drinks_preset";
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
      );

      const imageUrl = response.data.secure_url;

      onUploadSuccess(imageUrl);
    } catch (error) {
      console.error("Error uploading an image to Cloudinary:", error);
      alert(
        "The image could not be loaded. Please check your Cloudinary settings..",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <label className={styles.uploaderLabel}>
      {preview ? (
        <img
          src={preview}
          alt="Drink preview"
          className={styles.previewImage}
        />
      ) : (
        <div className={styles.placeholder}>
          <div className={styles.plusIconWrapper}>
            <span className={styles.plusIcon}>+</span>
          </div>

          <span className={styles.text}>Add image</span>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />
      {loading && <div className={styles.loader}>Uploading...</div>}
    </label>
  );
};
