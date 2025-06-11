import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import darkModeSlice from "./darkModeSlice";
import colorSchemeSlice from "./colorSchemeSlice";
import menuSlice from "./menuSlice";

// Store configuration with original Midone template slices only
export const store = configureStore({
  reducer: {
    theme: themeSlice,
    darkMode: darkModeSlice,
    colorScheme: colorSchemeSlice,
    menu: menuSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
