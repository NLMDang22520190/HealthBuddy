import React, { useTransition, useState, useEffect } from "react";
import { Avatar, Modal, message } from "antd";
import { Spinner, Label, TextInput } from "flowbite-react";

import api from "../../../../features/AxiosInstance/AxiosInstance";

const UpdateUserInfoModal = ({ open, onCancel, user, onUpdate }) => {
  const [isSavePending, startSaveTransition] = useTransition();

  const [userInfo, setUserInfo] = useState({
    name: user.name,
    avatar: user.avatar,
  });

  useEffect(() => {
    if (!open) {
      setUserInfo({
        name: user.name,
        avatar: user.avatar,
      });
    }
  }, [open, user]);

  const handleChange = (field, value) => {
    setUserInfo((prev) => ({
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
          disabled={isSavePending}
          onClick={() => handleSave()}
          className={`items-center h-10 px-4 rounded-lg bg-gradient-to-br from-primary-dark to-secondary-dark text-white ${
            isSavePending
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
    </Modal>
  );
};

export default UpdateUserInfoModal;
