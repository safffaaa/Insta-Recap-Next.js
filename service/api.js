"use client";
import { API_ENDPOINTS } from "../config/api";

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

// Helper function to get headers with auth token
const getHeaders = () => {
  const headers = { "Content-Type": "application/json" };
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const authService = {
  login: async (phoneNumber, eventId) => {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        phoneCode: "91",
        mobile: phoneNumber,
        event: eventId,
      }),
    });
    return handleResponse(response);
  },

  verifyOtp: async (phoneNumber, otp, eventId) => {
    const response = await fetch(API_ENDPOINTS.VERIFY_OTP, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        phoneCode: "91",
        mobile: phoneNumber,
        otp,
        event: eventId,
      }),
    });
    return handleResponse(response);
  },
};

export const eventService = {
  getEventDetails: async (eventId) => {
    const response = await fetch(
      `${API_ENDPOINTS.EVENT_DETAILS}?eventId=${eventId}`,
      { headers: getHeaders() }
    );
    return handleResponse(response);
  },

  getEventByDomain: async () => {
    if (typeof window === 'undefined') {
      throw new Error('getEventByDomain can only be called on the client side');
    }
    const response = await fetch(
      `${API_ENDPOINTS.EVENT}?domain=${window.location.hostname}`,
      { headers: getHeaders() }
    );
    return handleResponse(response);
  },  

  getRecapSettings: async (eventId) => {
    const response = await fetch(
      `${API_ENDPOINTS.RECAP_SETTINGS}?eventId=${eventId}`,
      { headers: getHeaders() }
    );
    return handleResponse(response);
  },
};

export const sessionService = {
  getSession: async (sessionId) => {
    const response = await fetch(
      `${API_ENDPOINTS.SESSION}?sessionId=${sessionId}`,
      { headers: getHeaders() }
    );
    return handleResponse(response);
  },

  getEventSessions: async (eventId) => {
    const response = await fetch(
      `${API_ENDPOINTS.SESSIONS}?eventId=${eventId}`,
      { headers: getHeaders() }
    );
    return handleResponse(response);
  },
};
