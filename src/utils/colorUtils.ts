/**
 * Advanced color utilities for Lawdesk theme system
 */

// Convert hex to RGB
export function hexToRgb(
  hex: string,
): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Convert RGB to hex
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Calculate relative luminance
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return 1;

  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

// Get optimal text color for a given background
export function getOptimalTextColor(backgroundColor: string): string {
  const whiteContrast = getContrastRatio(backgroundColor, "#ffffff");
  const blackContrast = getContrastRatio(backgroundColor, "#000000");
  const darkGrayContrast = getContrastRatio(backgroundColor, "#1f2937");
  const lightGrayContrast = getContrastRatio(backgroundColor, "#f9fafb");

  // WCAG AA standard requires 4.5:1 for normal text, 3:1 for large text
  const minContrast = 4.5;

  // Choose the color with the highest contrast that meets accessibility standards
  const options = [
    { color: "#ffffff", contrast: whiteContrast },
    { color: "#000000", contrast: blackContrast },
    { color: "#1f2937", contrast: darkGrayContrast },
    { color: "#f9fafb", contrast: lightGrayContrast },
  ];

  const bestOption = options
    .filter((option) => option.contrast >= minContrast)
    .sort((a, b) => b.contrast - a.contrast)[0];

  return bestOption
    ? bestOption.color
    : whiteContrast > blackContrast
      ? "#ffffff"
      : "#000000";
}

// Check if a color is valid hex
export function isValidHex(hex: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

// Normalize hex color (convert 3-digit to 6-digit)
export function normalizeHex(hex: string): string {
  if (!isValidHex(hex)) return "#000000";

  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  return "#" + hex.toLowerCase();
}

// Convert RGB to HSL
function rgbToHsl(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

// Convert HSL to RGB
function hslToRgb(
  h: number,
  s: number,
  l: number,
): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// Lighten or darken a color
export function adjustBrightness(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const adjust = (color: number) => {
    const adjusted = color + (color * percent) / 100;
    return Math.max(0, Math.min(255, Math.round(adjusted)));
  };

  return rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b));
}

// Generate a shade palette from a base color
export function generateColorPalette(baseColor: string): {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
} {
  const base = normalizeHex(baseColor);

  return {
    50: adjustBrightness(base, 85),
    100: adjustBrightness(base, 70),
    200: adjustBrightness(base, 50),
    300: adjustBrightness(base, 30),
    400: adjustBrightness(base, 15),
    500: base,
    600: adjustBrightness(base, -15),
    700: adjustBrightness(base, -30),
    800: adjustBrightness(base, -50),
    900: adjustBrightness(base, -70),
  };
}

// Generate complementary color
export function getComplementaryColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const compHue = (hsl.h + 180) % 360;
  const compRgb = hslToRgb(compHue, hsl.s, hsl.l);

  return rgbToHex(compRgb.r, compRgb.g, compRgb.b);
}

// Generate analogous colors
export function getAnalogousColors(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const analogous = [
    hslToRgb((hsl.h + 30) % 360, hsl.s, hsl.l),
    hslToRgb((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
  ];

  return analogous.map((rgb) => rgbToHex(rgb.r, rgb.g, rgb.b));
}

// Generate triadic colors
export function getTriadicColors(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const triadic = [
    hslToRgb((hsl.h + 120) % 360, hsl.s, hsl.l),
    hslToRgb((hsl.h + 240) % 360, hsl.s, hsl.l),
  ];

  return triadic.map((rgb) => rgbToHex(rgb.r, rgb.g, rgb.b));
}

// Generate monochromatic colors
export function getMonochromaticColors(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const monochromatic = [
    hslToRgb(hsl.h, hsl.s, Math.max(10, hsl.l - 30)),
    hslToRgb(hsl.h, hsl.s, Math.max(10, hsl.l - 15)),
    hslToRgb(hsl.h, hsl.s, Math.min(90, hsl.l + 15)),
    hslToRgb(hsl.h, hsl.s, Math.min(90, hsl.l + 30)),
  ];

  return monochromatic.map((rgb) => rgbToHex(rgb.r, rgb.g, rgb.b));
}

// Generate random color
export function generateRandomColor(): string {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 50) + 50; // 50-100%
  const lightness = Math.floor(Math.random() * 40) + 30; // 30-70%

  const rgb = hslToRgb(hue, saturation, lightness);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

// Generate color palette suggestions
export interface ColorPalette {
  name: string;
  colors: string[];
  category: string;
}

export function generateColorPalettes(): ColorPalette[] {
  return [
    {
      name: "Azul Profissional",
      colors: ["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd"],
      category: "Profissional",
    },
    {
      name: "Verde Natureza",
      colors: ["#166534", "#16a34a", "#4ade80", "#86efac"],
      category: "Natureza",
    },
    {
      name: "Roxo Criativo",
      colors: ["#6b21a8", "#9333ea", "#a855f7", "#c084fc"],
      category: "Criativo",
    },
    {
      name: "Laranja Energia",
      colors: ["#c2410c", "#ea580c", "#fb923c", "#fdba74"],
      category: "Energia",
    },
    {
      name: "Vermelho Clássico",
      colors: ["#991b1b", "#dc2626", "#f87171", "#fca5a5"],
      category: "Clássico",
    },
    {
      name: "Cinza Moderno",
      colors: ["#374151", "#6b7280", "#9ca3af", "#d1d5db"],
      category: "Moderno",
    },
    {
      name: "Turquesa Oceano",
      colors: ["#0f766e", "#14b8a6", "#5eead4", "#99f6e4"],
      category: "Oceano",
    },
    {
      name: "Rosa Suave",
      colors: ["#be185d", "#ec4899", "#f472b6", "#f9a8d4"],
      category: "Suave",
    },
  ];
}

// Generate new random palettes
export function generateRandomPalettes(count: number = 4): ColorPalette[] {
  const categories = ["Personalizada", "Aleatória", "Dinâmica", "Única"];
  const palettes: ColorPalette[] = [];

  for (let i = 0; i < count; i++) {
    const baseColor = generateRandomColor();
    const colors = [
      baseColor,
      ...getAnalogousColors(baseColor).slice(0, 1),
      ...getMonochromaticColors(baseColor).slice(0, 2),
    ];

    palettes.push({
      name: `Paleta ${i + 1}`,
      colors,
      category: categories[i % categories.length],
    });
  }

  return palettes;
}

// Apply theme colors to CSS variables and DOM elements
export function applyCustomThemeColors(
  primary: string,
  secondary: string,
  isDarkMode: boolean = false,
): void {
  const primaryPalette = generateColorPalette(primary);
  const secondaryPalette = generateColorPalette(secondary);

  const root = document.documentElement;

  // Apply primary color palette
  Object.entries(primaryPalette).forEach(([shade, color]) => {
    root.style.setProperty(`--color-primary-${shade}`, color);
  });

  // Apply secondary color palette
  Object.entries(secondaryPalette).forEach(([shade, color]) => {
    root.style.setProperty(`--color-secondary-${shade}`, color);
  });

  // Set main theme colors
  root.style.setProperty("--color-theme-1", primary);
  root.style.setProperty("--color-theme-2", secondary);

  // Calculate optimal text colors for headers and content
  const headerTextColor = getOptimalTextColor(primary);
  const secondaryTextColor = getOptimalTextColor(secondary);
  const contentTextColor = isDarkMode ? "#f8fafc" : "#1e293b";

  root.style.setProperty("--color-header-text", headerTextColor);
  root.style.setProperty("--color-secondary-text", secondaryTextColor);
  root.style.setProperty("--color-content-text", contentTextColor);

  // Apply to Tailwind CSS custom properties
  root.style.setProperty("--tw-color-primary", primary);
  root.style.setProperty("--tw-color-secondary", secondary);

  // Apply immediate theme colors to existing elements
  applyColorsToElements(
    primary,
    secondary,
    headerTextColor,
    secondaryTextColor,
  );

  // Force refresh of theme-dependent elements with transition
  document.body.classList.add("theme-transition");
  setTimeout(() => {
    document.body.classList.remove("theme-transition");
  }, 300);
}

// Apply colors to specific DOM elements
function applyColorsToElements(
  primary: string,
  secondary: string,
  headerText: string,
  secondaryText: string,
): void {
  // Theme elements
  const themeElements = document.querySelectorAll(
    '.bg-theme-1, [class*="bg-theme-1"]',
  );
  themeElements.forEach((element) => {
    (element as HTMLElement).style.backgroundColor = primary;
    (element as HTMLElement).style.color = headerText;
  });

  const theme2Elements = document.querySelectorAll(
    '.bg-theme-2, [class*="bg-theme-2"]',
  );
  theme2Elements.forEach((element) => {
    (element as HTMLElement).style.backgroundColor = secondary;
    (element as HTMLElement).style.color = secondaryText;
  });

  // Sidebar elements
  const sidebarActiveElements = document.querySelectorAll(
    ".side-menu--active, .side-nav--active",
  );
  sidebarActiveElements.forEach((element) => {
    (element as HTMLElement).style.backgroundColor = primary;
    (element as HTMLElement).style.color = headerText;
  });

  // Apply to buttons and links with primary colors
  const primaryButtons = document.querySelectorAll(".btn-primary, .bg-primary");
  primaryButtons.forEach((element) => {
    (element as HTMLElement).style.backgroundColor = primary;
    (element as HTMLElement).style.color = headerText;
    (element as HTMLElement).style.borderColor = primary;
  });

  // Update logos and icons in headers
  const logoTexts = document.querySelectorAll(".header-text-optimal");
  logoTexts.forEach((element) => {
    (element as HTMLElement).style.color = headerText;
  });

  // Update sidebar menu items for better contrast
  const sideMenuItems = document.querySelectorAll(".side-menu");
  sideMenuItems.forEach((element) => {
    if (!element.classList.contains("side-menu--active")) {
      const textElements = element.querySelectorAll("div, span, a");
      textElements.forEach((textEl) => {
        (textEl as HTMLElement).style.color = isDarkMode
          ? "#cbd5e1"
          : "#64748b";
      });
    }
  });
}

// Reset to default theme colors
export function resetToDefaultColors(isDarkMode: boolean = false): void {
  const defaultPrimary = "#3b82f6";
  const defaultSecondary = "#1e40af";

  applyCustomThemeColors(defaultPrimary, defaultSecondary, isDarkMode);
}

export default {
  hexToRgb,
  rgbToHex,
  getRelativeLuminance,
  getContrastRatio,
  getOptimalTextColor,
  isValidHex,
  normalizeHex,
  getComplementaryColor,
  getAnalogousColors,
  getTriadicColors,
  getMonochromaticColors,
  generateRandomColor,
  generateColorPalettes,
  generateRandomPalettes,
  adjustBrightness,
  generateColorPalette,
  applyCustomThemeColors,
  resetToDefaultColors,
};
