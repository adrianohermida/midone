/**
 * Theme configuration for Lawdesk
 */

export interface ThemeConfig {
  name: string;
  displayName: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: {
    light: string;
    dark: string;
  };
  logo: {
    className: string;
    filter: string;
  };
}

export const themeConfigs: Record<string, ThemeConfig> = {
  rubick: {
    name: "rubick",
    displayName: "Rubick",
    description: "Clean and modern blue theme",
    primaryColor: "#3b82f6",
    secondaryColor: "#1e40af",
    textColor: {
      light: "#1f2937",
      dark: "#ffffff",
    },
    logo: {
      className: "justice-scale-white",
      filter: "brightness(0) invert(1)",
    },
  },
  icewall: {
    name: "icewall",
    displayName: "Icewall",
    description: "Cool cyan theme for a professional look",
    primaryColor: "#06b6d4",
    secondaryColor: "#0891b2",
    textColor: {
      light: "#1f2937",
      dark: "#ffffff",
    },
    logo: {
      className: "justice-scale-white",
      filter: "brightness(0) invert(1)",
    },
  },
  tinker: {
    name: "tinker",
    displayName: "Tinker",
    description: "Fresh green theme for growth and balance",
    primaryColor: "#10b981",
    secondaryColor: "#059669",
    textColor: {
      light: "#1f2937",
      dark: "#ffffff",
    },
    logo: {
      className: "justice-scale-white",
      filter: "brightness(0) invert(1)",
    },
  },
  enigma: {
    name: "enigma",
    displayName: "Enigma",
    description: "Elegant purple theme for sophistication",
    primaryColor: "#8b5cf6",
    secondaryColor: "#7c3aed",
    textColor: {
      light: "#1f2937",
      dark: "#ffffff",
    },
    logo: {
      className: "justice-scale-white",
      filter: "brightness(0) invert(1)",
    },
  },
};

export const colorSchemeConfigs = {
  default: {
    name: "default",
    displayName: "Default",
    description: "Standard color scheme",
  },
  "theme-1": {
    name: "theme-1",
    displayName: "Professional",
    description: "Professional blue tones",
  },
  "theme-2": {
    name: "theme-2",
    displayName: "Nature",
    description: "Green and earth tones",
  },
  "theme-3": {
    name: "theme-3",
    displayName: "Sunset",
    description: "Warm orange and red tones",
  },
  "theme-4": {
    name: "theme-4",
    displayName: "Royal",
    description: "Purple and violet tones",
  },
};

export const layoutConfigs = {
  "side-menu": {
    name: "side-menu",
    displayName: "Side Menu",
    description: "Traditional sidebar navigation",
  },
  "simple-menu": {
    name: "simple-menu",
    displayName: "Simple Menu",
    description: "Minimal sidebar navigation",
  },
  "top-menu": {
    name: "top-menu",
    displayName: "Top Menu",
    description: "Horizontal top navigation",
  },
};

/**
 * Get theme configuration by name
 */
export function getThemeConfig(themeName: string): ThemeConfig | undefined {
  return themeConfigs[themeName];
}

/**
 * Get all available themes
 */
export function getAllThemes(): ThemeConfig[] {
  return Object.values(themeConfigs);
}

/**
 * Apply theme-specific styles to document
 */
export function applyThemeStyles(
  themeName: string,
  isDarkMode: boolean = false,
): void {
  const config = getThemeConfig(themeName);
  if (!config) return;

  const root = document.documentElement;

  // Apply CSS custom properties
  root.style.setProperty("--theme-primary", config.primaryColor);
  root.style.setProperty("--theme-secondary", config.secondaryColor);
  root.style.setProperty(
    "--theme-text",
    isDarkMode ? config.textColor.dark : config.textColor.light,
  );

  // Add theme class to body
  document.body.className = document.body.className.replace(/theme-\w+/g, "");
  document.body.classList.add(`theme-${themeName}`);
}

/**
 * Get contrast color (black or white) for given background color
 */
export function getContrastColor(hexColor: string): string {
  // Remove # if present
  const color = hexColor.replace("#", "");

  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for light backgrounds, white for dark backgrounds
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export default {
  themeConfigs,
  colorSchemeConfigs,
  layoutConfigs,
  getThemeConfig,
  getAllThemes,
  applyThemeStyles,
  getContrastColor,
};
