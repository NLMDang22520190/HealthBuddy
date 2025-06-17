import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/Auth";
import messageReducer from "./features/Message/messageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
  },
});

export default store;
