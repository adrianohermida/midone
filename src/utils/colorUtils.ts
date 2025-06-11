// Complete Color utilities for Midone theme
export interface ColorPalette {
  name: string;
  colors: string[];
}

export const isValidHex = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

export const hexToRgb = (
  hex: string,
): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const lightenColor = (color: string, amount: number = 0.2): string => {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  const { r, g, b } = rgb;
  const newR = Math.min(255, Math.round(r + (255 - r) * amount));
  const newG = Math.min(255, Math.round(g + (255 - g) * amount));
  const newB = Math.min(255, Math.round(b + (255 - b) * amount));

  return rgbToHex(newR, newG, newB);
};

export const darkenColor = (color: string, amount: number = 0.2): string => {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  const { r, g, b } = rgb;
  const newR = Math.max(0, Math.round(r * (1 - amount)));
  const newG = Math.max(0, Math.round(g * (1 - amount)));
  const newB = Math.max(0, Math.round(b * (1 - amount)));

  return rgbToHex(newR, newG, newB);
};

export const getContrastColor = (color: string): string => {
  const rgb = hexToRgb(color);
  if (!rgb) return "#000000";

  const { r, g, b } = rgb;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
};

export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;

    const { r, g, b } = rgb;
    const rsRGB = r / 255;
    const gsRGB = g / 255;
    const bsRGB = b / 255;

    const rLinear =
      rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const gLinear =
      gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const bLinear =
      bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
  };

  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  const brightest = Math.max(luminance1, luminance2);
  const darkest = Math.min(luminance1, luminance2);

  return (brightest + 0.05) / (darkest + 0.05);
};

export const generateRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getComplementaryColor = (color: string): string => {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  const { r, g, b } = rgb;
  return rgbToHex(255 - r, 255 - g, 255 - b);
};

export const getAnalogousColors = (color: string): string[] => {
  const rgb = hexToRgb(color);
  if (!rgb) return [color];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const analogous: string[] = [];

  // Generate 5 analogous colors
  for (let i = -2; i <= 2; i++) {
    if (i === 0) {
      analogous.push(color);
      continue;
    }
    let newHue = (hsl.h + i * 30) % 360;
    if (newHue < 0) newHue += 360;

    const newRgb = hslToRgb(newHue, hsl.s, hsl.l);
    analogous.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  }

  return analogous;
};

export const getTriadicColors = (color: string): string[] => {
  const rgb = hexToRgb(color);
  if (!rgb) return [color];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const triadic: string[] = [color];

  // Generate triadic colors (120 degrees apart)
  for (let i = 1; i <= 2; i++) {
    let newHue = (hsl.h + i * 120) % 360;
    const newRgb = hslToRgb(newHue, hsl.s, hsl.l);
    triadic.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  }

  return triadic;
};

export const getMonochromaticColors = (color: string): string[] => {
  const rgb = hexToRgb(color);
  if (!rgb) return [color];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const monochromatic: string[] = [];

  // Generate 5 monochromatic colors with different lightness
  const lightness = [0.2, 0.4, 0.5, 0.7, 0.9];

  lightness.forEach((l) => {
    const newRgb = hslToRgb(hsl.h, hsl.s, l);
    monochromatic.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  });

  return monochromatic;
};

export const generateColorPalettes = (baseColor: string): ColorPalette[] => {
  return [
    {
      name: "Analogous",
      colors: getAnalogousColors(baseColor),
    },
    {
      name: "Triadic",
      colors: getTriadicColors(baseColor),
    },
    {
      name: "Monochromatic",
      colors: getMonochromaticColors(baseColor),
    },
  ];
};

export const generateRandomPalettes = (): ColorPalette[] => {
  const randomColor = generateRandomColor();
  return generateColorPalettes(randomColor);
};

// Theme application function
export const applyCustomThemeColors = (
  colors: Record<string, string>,
): void => {
  Object.entries(colors).forEach(([property, color]) => {
    document.documentElement.style.setProperty(`--color-${property}`, color);
  });
};

// Helper functions
const rgbToHsl = (
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
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
      default:
        h = 0;
    }
    h /= 6;
  }

  return { h: h * 360, s, l };
};

const hslToRgb = (
  h: number,
  s: number,
  l: number,
): { r: number; g: number; b: number } => {
  h /= 360;

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
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
};
