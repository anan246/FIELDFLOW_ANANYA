// Centralized API configuration referencing environment variables from .env.local / process.env

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const ADMIN_API_BASE_URL =
  process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:5001/api/admin";

export const SETTINGS_API_URL = `${API_BASE_URL}/settings`;

export default {
  API_BASE_URL,
  ADMIN_API_BASE_URL,
  SETTINGS_API_URL,
};
