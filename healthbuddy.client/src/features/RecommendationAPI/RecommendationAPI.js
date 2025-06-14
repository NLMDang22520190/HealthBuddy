import api from "../AxiosInstance/AxiosInstance";

// Recommendation API Service
export const recommendationAPI = {
  // Get personalized food recommendations
  getFoodRecommendations: async (userId, count = 10) => {
    try {
      const response = await api.get(`/api/Recommendation/foods/${userId}?count=${count}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching food recommendations:", error);
      throw error;
    }
  },

  // Get personalized exercise recommendations
  getExerciseRecommendations: async (userId, count = 10) => {
    try {
      const response = await api.get(`/api/Recommendation/exercises/${userId}?count=${count}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching exercise recommendations:", error);
      throw error;
    }
  },

  // Get comprehensive personalized recommendations
  getPersonalizedRecommendations: async (userId, foodCount = 5, exerciseCount = 5) => {
    try {
      const response = await api.get(
        `/api/Recommendation/personalized/${userId}?foodCount=${foodCount}&exerciseCount=${exerciseCount}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching personalized recommendations:", error);
      throw error;
    }
  },

  // Get user health summary
  getUserHealthSummary: async (userId) => {
    try {
      const response = await api.get(`/api/Recommendation/health-summary/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching health summary:", error);
      throw error;
    }
  },

  // Get trending foods
  getTrendingFoods: async (count = 10) => {
    try {
      const response = await api.get(`/api/Recommendation/trending/foods?count=${count}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching trending foods:", error);
      throw error;
    }
  },

  // Get trending exercises
  getTrendingExercises: async (count = 10) => {
    try {
      const response = await api.get(`/api/Recommendation/trending/exercises?count=${count}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching trending exercises:", error);
      throw error;
    }
  },

  // Record feedback on recommendations
  recordFeedback: async (feedbackData) => {
    try {
      const response = await api.post("/api/Recommendation/feedback", feedbackData);
      return response.data;
    } catch (error) {
      console.error("Error recording feedback:", error);
      throw error;
    }
  }
};

// User Preference API Service
export const userPreferenceAPI = {
  // Get user preferences
  getUserPreference: async (userId) => {
    try {
      const response = await api.get(`/api/UserPreference/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user preferences:", error);
      throw error;
    }
  },

  // Create or update user preferences
  createOrUpdateUserPreference: async (preferenceData) => {
    try {
      const response = await api.post("/api/UserPreference", preferenceData);
      return response.data;
    } catch (error) {
      console.error("Error creating/updating user preferences:", error);
      throw error;
    }
  },

  // Update user preferences
  updateUserPreference: async (userId, updateData) => {
    try {
      const response = await api.put(`/api/UserPreference/${userId}`, updateData);
      return response.data;
    } catch (error) {
      console.error("Error updating user preferences:", error);
      throw error;
    }
  },

  // Delete user preferences
  deleteUserPreference: async (userId) => {
    try {
      const response = await api.delete(`/api/UserPreference/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user preferences:", error);
      throw error;
    }
  }
};
