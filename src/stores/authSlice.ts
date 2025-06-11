import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authService, User, AuthResponse } from "@/services/auth";

// Async thunk for login
export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await authService.login(email, password);
    if (!response.success) {
      throw new Error(response.message || "Login failed");
    }
    return response;
  },
);

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: authService.getCurrentUser(),
  token: authService.getToken(),
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    checkAuth: (state) => {
      const isAuth = authService.isAuthenticated();
      const user = authService.getCurrentUser();
      const token = authService.getToken();

      state.isAuthenticated = isAuth;
      state.user = user;
      state.token = token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.error = null;
        },
      )
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.error.message || "Login failed";
      });
  },
});

export const { logout, clearError, checkAuth } = authSlice.actions;
export default authSlice.reducer;
