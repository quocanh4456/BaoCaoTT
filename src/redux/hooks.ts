import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store'; // Sẽ lấy từ file store.ts

// Sử dụng 2 hooks này trong toàn bộ app thay vì hooks gốc
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;