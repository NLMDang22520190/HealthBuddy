import { createSlice } from "@reduxjs/toolkit";
import {
  getAuthFromCookies,
  clearAuthCookies,
} from "../CookieHelper/CookieHelper";
import { set } from "date-fns";
import { saveAuthToCookies } from "../CookieHelper/CookieHelper";

const initialState = getAuthFromCookies();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.userRole = action.payload.userRole;
      state.provider = action.payload.provider;
      state.isAuthenticated = action.payload.accessToken ? true : false;
      saveAuthToCookies({
        accessToken: action.payload.accessToken,
        userId: action.payload.userId,
        userRole: action.payload.userRole,
        provider: action.payload.provider,
        isAuthenticated: state.isAuthenticated,
      });
    },
    clearAuth(state) {
      state.accessToken = null;
      state.userId = null;
      state.userRole = null;
      state.provider = null;
      state.isAuthenticated = false;

      // Xóa cookies khi logout
      clearAuthCookies();
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
