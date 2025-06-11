// Simulated authentication service for Lawdesk CRM
export interface User {
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  success: boolean;
  message?: string;
}

// Default credentials as specified
const DEFAULT_CREDENTIALS = {
  email: "admin@lawdesk.com",
  password: "admin123",
};

// Simulated user data
const MOCK_USER: User = {
  email: "admin@lawdesk.com",
  name: "Administrador Lawdesk",
  role: "admin",
};

// Generate a simulated JWT token
const generateMockToken = (): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: MOCK_USER.email,
      name: MOCK_USER.name,
      role: MOCK_USER.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    }),
  );
  const signature = btoa("mock_signature_for_development");

  return `${header}.${payload}.${signature}`;
};

// Authentication functions
export const authService = {
  // Login function
  async login(email: string, password: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check credentials
    if (
      email === DEFAULT_CREDENTIALS.email &&
      password === DEFAULT_CREDENTIALS.password
    ) {
      const token = generateMockToken();

      // Store in localStorage
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_data", JSON.stringify(MOCK_USER));

      return {
        user: MOCK_USER,
        token,
        success: true,
        message: "Login realizado com sucesso!",
      };
    }

    return {
      user: {} as User,
      token: "",
      success: false,
      message: "Credenciais inválidas. Use admin@lawdesk.com / admin123",
    };
  },

  // Logout function
  logout(): void {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem("auth_token");
    if (!token) return false;

    try {
      // Parse the mock token to check expiration
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);

      return payload.exp > now;
    } catch {
      return false;
    }
  },

  // Get current user data
  getCurrentUser(): User | null {
    const userData = localStorage.getItem("user_data");
    if (!userData) return null;

    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  },

  // Get auth token
  getToken(): string | null {
    return localStorage.getItem("auth_token");
  },
};
