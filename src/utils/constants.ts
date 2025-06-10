// Application constants

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  PROFILE: "/profile",
} as const;

export const STORAGE_KEYS = {
  USER_TOKEN: "userToken",
  USER_PREFERENCES: "userPreferences",
} as const;

export const THEME_COLORS = {
  primary: "#3B82F6",
  secondary: "#6B7280",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
} as const;
