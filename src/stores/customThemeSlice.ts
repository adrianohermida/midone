// Custom theme functionality removed - not part of original Midone template
// This file has been emptied to restore original template functionality

import { createSlice } from "@reduxjs/toolkit";

export interface CustomTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
  };
  isCustom: boolean;
  createdAt: number;
}

const initialState = {
  customThemes: [] as CustomTheme[],
  activeCustomTheme: null as CustomTheme | null,
  isUsingCustomTheme: false,
};

export const customThemeSlice = createSlice({
  name: "customTheme",
  initialState,
  reducers: {},
});

export const selectCustomThemes = () => [];
export const selectActiveCustomTheme = () => null;
export const selectIsUsingCustomTheme = () => false;
export const addCustomTheme = () => {};
export const setActiveCustomTheme = () => {};
export const clearCustomTheme = () => {};
export const removeCustomTheme = () => {};

export default customThemeSlice.reducer;
