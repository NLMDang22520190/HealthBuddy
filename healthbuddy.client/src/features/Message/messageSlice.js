import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  currentConversation: null,
  messages: [],
  isLoading: false,
  isMessagesLoading: false,
  error: null,
  messagesError: null,
  currentPage: 1,
  hasMoreMessages: true,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    // Conversations
    setConversationsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setConversationsError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addConversation: (state, action) => {
      const existingIndex = state.conversations.findIndex(
        (conv) => conv.conversationId === action.payload.conversationId
      );
      if (existingIndex >= 0) {
        state.conversations[existingIndex] = action.payload;
      } else {
        state.conversations.unshift(action.payload);
      }
    },

    // Current conversation
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
      state.messages = [];
      state.currentPage = 1;
      state.hasMoreMessages = true;
    },
    clearCurrentConversation: (state) => {
      state.currentConversation = null;
      state.messages = [];
      state.currentPage = 1;
      state.hasMoreMessages = true;
    },

    // Messages
    setMessagesLoading: (state, action) => {
      state.isMessagesLoading = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.isMessagesLoading = false;
      state.messagesError = null;
    },
    appendMessages: (state, action) => {
      // For pagination - add older messages to the beginning
      state.messages = [...action.payload, ...state.messages];
      state.isMessagesLoading = false;
      state.messagesError = null;
    },
    addMessage: (state, action) => {
      // Add new message to the end
      state.messages.push(action.payload);
      
      // Update conversation's last message
      const conversationIndex = state.conversations.findIndex(
        (conv) => conv.conversationId === action.payload.conversationId
      );
      if (conversationIndex >= 0) {
        state.conversations[conversationIndex].lastMessageContent = action.payload.content;
        state.conversations[conversationIndex].lastMessageSenderId = action.payload.senderId;
        state.conversations[conversationIndex].lastMessageAt = action.payload.sentAt;
        
        // Move conversation to top
        const conversation = state.conversations[conversationIndex];
        state.conversations.splice(conversationIndex, 1);
        state.conversations.unshift(conversation);
      }
    },
    setMessagesError: (state, action) => {
      state.messagesError = action.payload;
      state.isMessagesLoading = false;
    },

    // Pagination
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setHasMoreMessages: (state, action) => {
      state.hasMoreMessages = action.payload;
    },

    // Clear all
    clearMessages: (state) => {
      state.conversations = [];
      state.currentConversation = null;
      state.messages = [];
      state.isLoading = false;
      state.isMessagesLoading = false;
      state.error = null;
      state.messagesError = null;
      state.currentPage = 1;
      state.hasMoreMessages = true;
    },
  },
});

export const {
  setConversationsLoading,
  setConversations,
  setConversationsError,
  addConversation,
  setCurrentConversation,
  clearCurrentConversation,
  setMessagesLoading,
  setMessages,
  appendMessages,
  addMessage,
  setMessagesError,
  setCurrentPage,
  setHasMoreMessages,
  clearMessages,
} = messageSlice.actions;

export default messageSlice.reducer;
