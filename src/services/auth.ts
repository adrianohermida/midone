/**
 * Authentication service for Lawdesk
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

class AuthService {
  private static instance: AuthService;
  private listeners: ((state: AuthState) => void)[] = [];

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Subscribe to auth state changes
   */
  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Notify all listeners of state changes
   */
  private notify(): void {
    const state = this.getAuthState();
    this.listeners.forEach((listener) => listener(state));
  }

  /**
   * Get current authentication state
   */
  getAuthState(): AuthState {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        return {
          isAuthenticated: true,
          user,
          token,
        };
      } catch (error) {
        // Clear invalid data
        this.logout();
        return {
          isAuthenticated: false,
          user: null,
          token: null,
        };
      }
    }

    return {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getAuthState().isAuthenticated;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.getAuthState().user;
  }

  /**
   * Login user
   */
  login(token: string, user: User): void {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(user));
    this.notify();
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("rememberMe");

    // Clear any other session data
    sessionStorage.clear();

    this.notify();
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return localStorage.getItem("authToken");
  }

  /**
   * Refresh token (placeholder for actual implementation)
   */
  async refreshToken(): Promise<boolean> {
    // In a real app, this would call the backend to refresh the token
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      // Simulate API call
      // const response = await api.refreshToken(token);
      // this.login(response.token, response.user);
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  /**
   * Update user profile
   */
  updateUser(user: Partial<User>): void {
    const currentState = this.getAuthState();
    if (currentState.user) {
      const updatedUser = { ...currentState.user, ...user };
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      this.notify();
    }
  }
}

export const authService = AuthService.getInstance();
export default authService;
