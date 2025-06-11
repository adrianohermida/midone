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
    description: "Template azul profissional e moderno",
    primaryColor: "#1e40af", // Azul original do Rubick
    secondaryColor: "#3b82f6",
    textColor: {
      light: "#1f2937",
      dark: "#ffffff",
    },
    logo: {
      className: "text-white",
      filter: "brightness(0) invert(1)",
    },
  },
  icewall: {
    name: "icewall",
    displayName: "Icewall",
    description: "Template cyan gelado e elegante",
    primaryColor: "#0891b2", // Cyan original do Icewall
    secondaryColor: "#06b6d4",
    textColor: {
      light: "#1f2937",
      dark: "#ffffff",
    },
    logo: {
      className: "text-white",
      filter: "brightness(0) invert(1)",
    },
  },
  tinker: {
    name: "tinker",
    displayName: "Tinker",
    description: "Template verde natural e equilibrado",
    primaryColor: "#059669", // Verde original do Tinker
    secondaryColor: "#10b981",
    textColor: {
      light: "#1f2937",
      dark: "#ffffff",
    },
    logo: {
      className: "text-white",
      filter: "brightness(0) invert(1)",
    },
  },
  enigma: {
    name: "enigma",
    displayName: "Enigma",
    description: "Template roxo sofisticado e misterioso",
    primaryColor: "#7c3aed", // Roxo original do Enigma
    secondaryColor: "#8b5cf6",
    textColor: {
      light: "#1f2937",
      dark: "#ffffff",
    },
    logo: {
      className: "text-white",
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

  // Apply theme colors from configuration
  root.style.setProperty("--color-theme-1", config.primaryColor);
  root.style.setProperty("--color-theme-2", config.secondaryColor);
  root.style.setProperty(
    "--color-header-text",
    getContrastColor(config.primaryColor),
  );
  root.style.setProperty(
    "--color-secondary-text",
    getContrastColor(config.secondaryColor),
  );
  root.style.setProperty(
    "--color-content-text",
    isDarkMode ? config.textColor.dark : config.textColor.light,
  );

  // Apply to CSS custom properties for consistency
  root.style.setProperty("--theme-primary", config.primaryColor);
  root.style.setProperty("--theme-secondary", config.secondaryColor);
  root.style.setProperty(
    "--theme-text",
    isDarkMode ? config.textColor.dark : config.textColor.light,
  );

  // Apply theme colors to elements immediately
  applyColorsToElements(
    config.primaryColor,
    config.secondaryColor,
    getContrastColor(config.primaryColor),
    isDarkMode,
  );

  // Add theme class to body
  document.body.className = document.body.className.replace(/theme-\w+/g, "");
  document.body.classList.add(`theme-${themeName}`);

  // Force transition
  document.body.classList.add("theme-transition");
  setTimeout(() => {
    document.body.classList.remove("theme-transition");
  }, 300);
}

/**
 * Apply colors to specific DOM elements
 */
function applyColorsToElements(
  primary: string,
  secondary: string,
  headerText: string,
  isDarkMode: boolean,
): void {
  // Theme elements
  const themeElements = document.querySelectorAll(
    '.bg-theme-1, [class*="bg-theme-1"]',
  );
  themeElements.forEach((element) => {
    (element as HTMLElement).style.setProperty(
      "background-color",
      primary,
      "important",
    );
    (element as HTMLElement).style.setProperty(
      "color",
      headerText,
      "important",
    );
  });

  const theme2Elements = document.querySelectorAll(
    '.bg-theme-2, [class*="bg-theme-2"]',
  );
  theme2Elements.forEach((element) => {
    (element as HTMLElement).style.setProperty(
      "background-color",
      secondary,
      "important",
    );
    (element as HTMLElement).style.setProperty(
      "color",
      getContrastColor(secondary),
      "important",
    );
  });

  // Update text elements
  const headerTextElements = document.querySelectorAll(".header-text-optimal");
  headerTextElements.forEach((element) => {
    (element as HTMLElement).style.setProperty(
      "color",
      headerText,
      "important",
    );
  });

  // Apply to floating theme button
  const themeButton = document.querySelector(
    "[data-theme-button]",
  ) as HTMLElement;
  if (themeButton) {
    themeButton.style.setProperty("background-color", primary, "important");
  }
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
