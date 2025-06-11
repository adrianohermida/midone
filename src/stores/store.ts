import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import darkModeSlice from "./darkModeSlice";
import colorSchemeSlice from "./colorSchemeSlice";
import menuSlice from "./menuSlice";
import legalCasesSlice from "./legalCasesSlice";
import intimationsSlice from "./intimationsSlice";

// Store configuration with original Midone template slices + Legal Cases modules
export const store = configureStore({
  reducer: {
    theme: themeSlice,
    darkMode: darkModeSlice,
    colorScheme: colorSchemeSlice,
    menu: menuSlice,
    legalCases: legalCasesSlice,
    intimations: intimationsSlice,
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
