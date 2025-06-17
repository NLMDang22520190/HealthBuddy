import React, { useState, useEffect } from "react";
import { Modal, Input, List, Avatar, Typography, Spin, message } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "../../hooks/useDebounce";
import api from "../../../features/AxiosInstance/AxiosInstance";

const { Text } = Typography;
const { Search } = Input;

const UserSearch = ({ visible, onClose, onUserSelect, currentUserId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length >= 2) {
      searchUsers(debouncedSearchTerm);
    } else {
      setUsers([]);
    }
  }, [debouncedSearchTerm]);

  const searchUsers = async (term) => {
    setIsLoading(true);
    try {
      // Using the existing users endpoint to search
      const response = await api.get("/api/User");
      
      // Filter users based on search term and exclude current user
      const filteredUsers = response.data.filter(
        (user) =>
          user.userId !== currentUserId &&
          (user.username.toLowerCase().includes(term.toLowerCase()) ||
           user.email.toLowerCase().includes(term.toLowerCase()))
      );

      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error searching users:", error);
      message.error("Failed to search users");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    onUserSelect(user);
    setSearchTerm("");
    setUsers([]);
    onClose();
  };

  const handleClose = () => {
    setSearchTerm("");
    setUsers([]);
    onClose();
  };

  return (
    <Modal
      title="Start New Conversation"
      open={visible}
      onCancel={handleClose}
      footer={null}
      width={500}
    >
      <div className="space-y-4">
        <Search
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined />}
          allowClear
        />

        {isLoading && (
          <div className="text-center py-8">
            <Spin size="large" />
          </div>
        )}

        {!isLoading && searchTerm && searchTerm.length < 2 && (
          <div className="text-center py-8 text-gray-500">
            <Text type="secondary">Enter at least 2 characters to search</Text>
          </div>
        )}

        {!isLoading && users.length === 0 && searchTerm.length >= 2 && (
          <div className="text-center py-8 text-gray-500">
            <UserOutlined className="text-4xl mb-4" />
            <Text type="secondary">No users found</Text>
          </div>
        )}

        {!isLoading && users.length > 0 && (
          <List
            dataSource={users}
            renderItem={(user) => (
              <List.Item
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                onClick={() => handleUserSelect(user)}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={user.avatar}
                      icon={!user.avatar && <UserOutlined />}
                      size="large"
                    />
                  }
                  title={
                    <Text strong className="text-gray-900 dark:text-gray-100">
                      {user.username}
                    </Text>
                  }
                  description={
                    <Text type="secondary">{user.email}</Text>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </div>
    </Modal>
  );
};

export default UserSearch;
