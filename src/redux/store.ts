import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './reducer/newsReducer.ts';

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;