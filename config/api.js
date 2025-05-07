const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://backend-endpoint.eventhex.ai";
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || "https://event-manager.syd1.cdn.digitaloceanspaces.com/";

export const API_ENDPOINTS = {
  LOGIN: `${BACKEND_URL}/api/v1/auth/login-mobile-with-country`,
  VERIFY_OTP: `${BACKEND_URL}/api/v1/auth/verify-otp-with-country`,
  RESEND_OTP: `${BACKEND_URL}/api/v1/auth/login-mobile-with-country`,
  EVENT: `${BACKEND_URL}/api/v1/auth/domain-event`,
  RECAP_SETTINGS: `${BACKEND_URL}/api/v1/instarecap-setting`,
  SESSION: `${BACKEND_URL}/api/v1/session`,
  SESSIONS: `${BASE_URL}/sessions/event`,
  EVENT_DETAILS: `${BASE_URL}/event`,
};

export const CDN_BASE_URL = CDN_URL;
 