"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessions: [],
  currentSession: null,
  currentAudio: null,
  loading: false,
  error: null,
};

export const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    setSessions: (state, action) => {
      state.sessions = action.payload;
    },
    setCurrentSession: (state, action) => {
      state.currentSession = action.payload;
    },
    setCurrentAudio: (state, action) => {
      state.currentAudio = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearSessionData: (state) => {
      state.sessions = [];
      state.currentSession = null;
      state.currentAudio = null;
    },
  },
});

// Action creators
export const {
  setSessions,
  setCurrentSession,
  setCurrentAudio,
  setLoading,
  setError,
  clearSessionData,
} = sessionsSlice.actions;

// Selectors
export const selectSessions = (state) => state.sessions.sessions;
export const selectCurrentSession = (state) => state.sessions.currentSession;
export const selectCurrentAudio = (state) => state.sessions.currentAudio;
export const selectLoading = (state) => state.sessions.loading;
export const selectError = (state) => state.sessions.error;

export default sessionsSlice.reducer;
