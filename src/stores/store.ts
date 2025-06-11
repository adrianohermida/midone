import { configureStore } from "@reduxjs/toolkit";

// Create a basic store configuration
export const store = configureStore({
  reducer: {
    // Add your reducers here as you develop features
    // Example: auth: authSlice.reducer,
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
