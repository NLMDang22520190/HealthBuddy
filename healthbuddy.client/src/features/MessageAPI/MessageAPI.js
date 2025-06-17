import api from "../AxiosInstance/AxiosInstance";

// Message API Service
export const messageAPI = {
  // Get user conversations
  getUserConversations: async (userId) => {
    try {
      const response = await api.get(`/api/Message/conversations/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  },

  // Get messages in a conversation
  getConversationMessages: async (conversationId, userId, page = 1, pageSize = 20) => {
    try {
      const response = await api.get(
        `/api/Message/conversation/${conversationId}/messages?page=${page}&pageSize=${pageSize}&userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  // Send a message
  sendMessage: async (conversationId, content, senderId) => {
    try {
      const response = await api.post(
        `/api/Message/send?senderId=${senderId}`,
        {
          conversationId,
          content,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },

  // Create a new conversation
  createConversation: async (currentUserId, participantUserId) => {
    try {
      const response = await api.post(
        `/api/Message/conversation?currentUserId=${currentUserId}`,
        {
          participantUserId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating conversation:", error);
      throw error;
    }
  },

  // Mark message as read
  markMessageAsRead: async (messageId, userId) => {
    try {
      const response = await api.put(
        `/api/Message/${messageId}/read?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error marking message as read:", error);
      throw error;
    }
  },

  // Get unread message count
  getUnreadMessageCount: async (conversationId, userId) => {
    try {
      const response = await api.get(
        `/api/Message/conversation/${conversationId}/unread-count?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting unread count:", error);
      throw error;
    }
  },
};

export default messageAPI;
