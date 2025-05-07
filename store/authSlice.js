"use client";
import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely access localStorage
const getLocalStorageItem = (key, defaultValue) => {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue;
    }
  }
  return defaultValue;
};

const initialState = {
  isAuthenticated: getLocalStorageItem("isAuthenticated", false),
  user: getLocalStorageItem("user", null),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem("user", JSON.stringify(action.payload));
          localStorage.setItem("isAuthenticated", "true");
          
          // Store tokens in localStorage
          if (action.payload.token) {
            localStorage.setItem("token", action.payload.token);
          }
          if (action.payload.refreshToken) {
            localStorage.setItem("refreshToken", action.payload.refreshToken);
          }
        } catch (error) {
          console.error('Error saving auth data to localStorage:', error);
        }
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem("user");
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
        } catch (error) {
          console.error('Error clearing auth data from localStorage:', error);
        }
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logout, setLoading, setError } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
