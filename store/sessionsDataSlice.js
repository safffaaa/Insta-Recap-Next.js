"use client";
import { createSlice } from "@reduxjs/toolkit";

// Constants
const STORAGE_KEY = 'sessionData';
const EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

// Storage Utils
const storageUtils = {
  saveToStorage: (data) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  },

  loadFromStorage: () => {
    if (typeof window !== 'undefined') {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        return {};
      }
    }
    return {};
  },

  isExpired: (timestamp) => {
    return Date.now() - timestamp > EXPIRATION_TIME;
  },

  cleanExpiredData: (data) => {
    const cleaned = {};
    Object.entries(data).forEach(([key, value]) => {
      if (!storageUtils.isExpired(value.timestamp)) {
        cleaned[key] = value;
      }
    });
    return cleaned;
  }
};

// Load initial state from localStorage and clean expired data
const loadInitialState = () => {
  if (typeof window !== 'undefined') {
    const storedData = storageUtils.loadFromStorage();
    const cleanedData = storageUtils.cleanExpiredData(storedData);
    storageUtils.saveToStorage(cleanedData); // Save cleaned data back
    return {
      sessionData: cleanedData
    };
  }
  return { sessionData: {} };
};

const sessionDataSlice = createSlice({
  name: "sessionData",
  initialState: loadInitialState(),
  reducers: {
    setSessionData: (state, action) => {
      const { sessionId, data } = action.payload;
      state.sessionData = {
        ...state.sessionData,
        [sessionId]: {
          data,
          timestamp: Date.now()
        }
      };
      // Save to localStorage
      storageUtils.saveToStorage(state.sessionData);
    },
  },
});

export const { setSessionData } = sessionDataSlice.actions;
export default sessionDataSlice.reducer;
