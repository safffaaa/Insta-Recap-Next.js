"use client";
import { createSlice } from "@reduxjs/toolkit";

// Constants
const STORAGE_KEY = 'audioData';
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
      audioData: cleanedData
    };
  }
  return { audioData: {} };
};

const audioSlice = createSlice({
  name: "audio",
  initialState: loadInitialState(),
  reducers: {
    setAudioData: (state, action) => {
      const { audioId, data } = action.payload;
      state.audioData = {
        ...state.audioData,
        [audioId]: {
          data,
          timestamp: Date.now()
        }
      };
      // Save to localStorage
      storageUtils.saveToStorage(state.audioData);
    },
  },
});

export const { setAudioData } = audioSlice.actions;
export default audioSlice.reducer;
