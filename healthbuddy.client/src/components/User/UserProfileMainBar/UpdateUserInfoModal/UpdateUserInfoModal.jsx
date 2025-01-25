import React, { useTransition, useState, useEffect } from "react";
import { Avatar, Modal, message } from "antd";
import { Spinner, Label, TextInput } from "flowbite-react";

import api from "../../../../features/AxiosInstance/AxiosInstance";

const UpdateUserInfoModal = ({ open, onCancel, user, onUpdate }) => {
  const [isSavePending, startSaveTransition] = useTransition();
  const [isPasswordSavePending, startPasswordSaveTransition] = useTransition();

  const isSaving = isSavePending || isPasswordSavePending;

  const isEmailProvider = user.Provider === "emailandpassword";

  const [userPassword, setUserPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [userInfo, setUserInfo] = useState({
    name: user.name,
    avatar: user.avatar,
    email: user.email,
  });

  useEffect(() => {
    if (!open) {
      setUserInfo({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
      setUserPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [open, user]);

  const handleChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = (field, value) => {
    setUserPassword((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    startSaveTransition(async () => {
      try {
        await api.put("/api/User/UpdateUser", {
          userId: user.id,
          username: userInfo.name,
          avatar: userInfo.avatar,
        });
        setTimeout(() => {
          message.success("User info updated successfully");
          onUpdate();
          onCancel(); // Đóng modal
        }, 500);
      } catch (error) {
        message.error("Error updating user info: " + error.message);
      }
    });
  };

  const handleUpdatePassword = async () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(userPassword.newPassword)) {
      message.error(
        "New password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
      );
      return;
    }

    if (userPassword.newPassword !== userPassword.confirmPassword) {
      message.error("New password and confirm password do not match.");
      return;
    }

    startPasswordSaveTransition(async () => {
      try {
        await api.post("/api/Auth/UpdatePassword", {
          email: user.email,
          password: userPassword.currentPassword,
          newPassword: userPassword.newPassword,
        });
        message.success("Password updated successfully");
      } catch (error) {
        const errorCustomData = error.customData;
        if (errorCustomData) {
          const errorData = errorCustomData.error;
          //console.error("Login error:", errorData);

          if (errorData) {
            message.error("Error updating password: " + errorData);
          }
        } else message.error("An error occurred. Please try again later.");
      }
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Update User Info"
      centered
      footer={[
        <button
          onClick={onCancel}
          className={`mr-2 items-center h-10 px-4 rounded-lg border-2 border-compleprimary-dark bg-white text-black ${
            isSavePending
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gradient-to-br hover:from-compleprimary-dark hover:to-complesecond-dark hover:text-white"
          }`}
        >
          Cancel
        </button>,
        <button
          disabled={isSaving}
          onClick={() => handleSave()}
          className={`items-center h-10 px-4 rounded-lg bg-gradient-to-br from-primary-dark to-secondary-dark text-white ${
            isSaving
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark"
          }`}
        >
          {isSavePending ? (
            <span className="flex items-center justify-center">
              <Spinner color="info" aria-label="White spinner example" />
              <span className="ml-2">Saving...</span>
            </span>
          ) : (
            "Save"
          )}
        </button>,
      ]}
    >
      <div className="flex items-center gap-6">
        <Avatar className="size-40" src={userInfo.avatar} />
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex items-center justify-between ">
            <Label className="text-base text-primary-dark">Username</Label>
            <TextInput
              className="bg-gray-200 rounded-lg"
              onChange={(e) => handleChange("name", e.target.value)}
              value={userInfo.name}
            />
          </div>
          <div className="flex items-center justify-between ">
            <Label className="text-base text-primary-dark">Avatar</Label>
            <TextInput
              className="bg-gray-200 rounded-lg"
              onChange={(e) => handleChange("avatar", e.target.value)}
              value={userInfo.avatar}
            />
          </div>
        </div>
      </div>
      {isEmailProvider && (
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex flex-col gap-2 justify-between">
            <Label className="text-base text-primary-dark">
              Current Password
            </Label>
            <TextInput
              required
              type="password"
              className="bg-gray-200 rounded-lg"
              onChange={(e) =>
                handlePasswordChange("currentPassword", e.target.value)
              }
              value={userPassword.currentPassword}
            />
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <Label className="text-base text-primary-dark">New Password</Label>
            <TextInput
              required
              type="password"
              className="bg-gray-200 rounded-lg"
              onChange={(e) =>
                handlePasswordChange("newPassword", e.target.value)
              }
              value={userPassword.newPassword}
            />
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <Label className="text-base text-primary-dark">
              Confirm Password
            </Label>
            <TextInput
              required
              type="password"
              className="bg-gray-200 rounded-lg"
              onChange={(e) =>
                handlePasswordChange("confirmPassword", e.target.value)
              }
              value={userPassword.confirmPassword}
            />
          </div>
          <button
            disabled={isSaving}
            onClick={() => handleUpdatePassword()}
            className={`mt-2 items-center h-10 px-4 rounded-lg bg-gradient-to-br from-primary-dark to-secondary-dark text-white ${
              isSaving
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark"
            }`}
          >
            {isPasswordSavePending ? (
              <span className="flex items-center justify-center">
                <Spinner color="info" aria-label="White spinner example" />
                <span className="ml-2">Updating...</span>
              </span>
            ) : (
              "Update Password"
            )}
          </button>
          ,
        </div>
      )}
    </Modal>
  );
};

export default UpdateUserInfoModal;
