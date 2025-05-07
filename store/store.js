"use client";
import { configureStore } from '@reduxjs/toolkit';
import sessionsReducer from './sessionsSlice';
import authReducer from "./authSlice";
import audioReducer from "./audioSlice";
import sessionDataReducer from "./sessionsDataSlice";

// Create store only on client side
const createStore = () => {
  try {
    return configureStore({
      reducer: {
        sessions: sessionsReducer,
        auth: authReducer,
        audio: audioReducer,
        sessionData: sessionDataReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Ignore these action types
            ignoredActions: ['audio/setAudioData', 'sessionData/setSessionData'],
            // Ignore these field paths in all actions
            ignoredActionPaths: ['payload.timestamp'],
            // Ignore these paths in the state
            ignoredPaths: ['audio.audioData', 'sessionData.sessionData'],
          },
        }),
    });
  } catch (error) {
    console.error('Error creating store:', error);
    return null;
  }
};

// Initialize store
let store;

// Create store instance for client side
if (typeof window !== 'undefined') {
  store = createStore();
  if (!store) {
    // Fallback to a minimal store if creation fails
    store = {
      getState: () => ({}),
      dispatch: () => {},
      subscribe: () => () => {},
    };
  }
} else {
  // Create a dummy store for server-side rendering
  store = {
    getState: () => ({}),
    dispatch: () => {},
    subscribe: () => () => {},
  };
}

export { store };