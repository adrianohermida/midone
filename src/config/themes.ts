// Original Midone template theme configuration
// Custom theme configurations have been removed

export interface ThemeConfig {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
  };
}

export const themeConfigs: Record<string, ThemeConfig> = {
  rubick: {
    name: "rubick",
    displayName: "Rubick",
    colors: {
      primary: "#3b82f6",
      secondary: "#1e40af",
    },
  },
  icewall: {
    name: "icewall",
    displayName: "Icewall",
    colors: {
      primary: "#06b6d4",
      secondary: "#0891b2",
    },
  },
  tinker: {
    name: "tinker",
    displayName: "Tinker",
    colors: {
      primary: "#10b981",
      secondary: "#059669",
    },
  },
  enigma: {
    name: "enigma",
    displayName: "Enigma",
    colors: {
      primary: "#8b5cf6",
      secondary: "#7c3aed",
    },
  },
};

export const getThemeConfig = (themeName: string): ThemeConfig | undefined => {
  return themeConfigs[themeName];
};

export const applyThemeStyles = (themeName: string, darkMode: boolean) => {
  // Basic theme application - original template functionality only
  const root = document.documentElement;

  if (darkMode) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};
