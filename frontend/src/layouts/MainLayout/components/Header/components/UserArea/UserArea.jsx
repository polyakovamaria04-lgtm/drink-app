import { useState, useEffect, useRef } from "react";
import styles from "./UserArea.module.scss";
import { Avatar } from "@/assets/svg/Avatar/Avatar.jsx";
import { UserProfileForm } from "../UserProfileForm/UserProfileForm";
import { Modal } from "../Modal/Modal";
import { LogOutView } from "../Modal/LogOutView";

import PencilIcon from "@/assets/svg/just-icons/pencil.svg?react";
import { useNavigate } from "react-router-dom";

export const UserArea = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [user, setUser] = useState({
    name: "",
    avatarURL: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userAreaRef = useRef(null);

  const handleSaveProfile = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "${import.meta.env.VITE_API_URL}/api/user/update",
        {
          method: "PATCH",
          body: formData,
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );

      if (!response.ok) {
        throw new Error("Error updating profile");
      }

      const updatedUser = await response.json();

      setUser({
        name: updatedUser.name,
        avatarURL: updatedUser.avatarURL,
      });

      setActiveModal(null);
    } catch (error) {
      console.error("Unable to save the profile:", error);
      alert("Something went wrong while saving the changes.");
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          "${import.meta.env.VITE_API_URL}/api/user/current",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();

          setUser({
            name: data.name,
            avatarURL: data.avatarURL,
          });
        }
      } catch (error) {
        console.error("Unable to load user profile:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleOutsideClick = (event) => {
      if (userAreaRef.current && !userAreaRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isDropdownOpen]);

  const handleLogoutSuccess = () => {
    setUser({ name: "", avatarURL: "" });
    if (setIsAuthenticated) setIsAuthenticated(false);
    setActiveModal(null);
    navigate("/welcome", { replace: true });
  };

  return (
    <>
      <div className={styles.userAreaWrapper} ref={userAreaRef}>
        <div
          className={styles.UserArea}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {user.avatarURL ? (
            <img
              src={user.avatarURL}
              alt={user.name}
              className={styles.userAvatarMini}
            />
          ) : (
            <Avatar />
          )}

          <span className={styles.UserNameArea}>
            {user.name || "Loading..."}
          </span>
        </div>

        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            <button
              type="button"
              className={styles.dropdownBtn}
              onClick={() => {
                setActiveModal("profile");
                setIsDropdownOpen(false);
              }}>
              <span>Edit profile</span>
              <PencilIcon className={styles.editIcon} />
            </button>

            <button
              type="button"
              className={styles.logoutBtn}
              onClick={() => {
                setActiveModal("logout");
                setIsDropdownOpen(false);
              }}>
              Log out
            </button>
          </div>
        )}
      </div>

      <Modal
        variant="userForm"
        isOpen={activeModal === "profile"}
        onClose={() => setActiveModal(null)}>
        <UserProfileForm
          key={`${user.name}-${user.avatarURL}`}
          currentUser={user}
          onSave={handleSaveProfile}
        />
      </Modal>

      <Modal
        variant="logout"
        isOpen={activeModal === "logout"}
        onClose={() => setActiveModal(null)}>
        <LogOutView
          onClose={() => setActiveModal(null)}
          onLogoutSuccess={handleLogoutSuccess}
        />
      </Modal>
    </>
  );
};
