import { createSlice } from '@reduxjs/toolkit';
import { getNewsList } from '../action/newsActions';

// 👇 QUAN TRỌNG: Import Article từ file types chung
// (Xóa đoạn interface Article { ... } từ dòng 4-11 đi nhé!)
import type { Article } from '../../types/news'; 

// Xóa đoạn này đi:
// interface Article {
//   id: number;
//   ...
// }

const initialState = {
  latestArticles: [] as Article[], // Lúc này nó sẽ dùng đúng chuẩn Article bắt buộc ảnh
  trendingArticles: [] as Article[],
  loading: false,
  error: null as string | null, // Sửa lại type error chút cho chuẩn
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewsList.fulfilled, (state, action) => {
        state.loading = false;
        state.latestArticles = action.payload.latest;
        state.trendingArticles = action.payload.trending;
      })
      .addCase(getNewsList.rejected, (state, action) => {
        state.loading = false;
        // Ép kiểu lỗi thành string để gán vào state
        state.error = action.payload as string || 'Có lỗi xảy ra'; 
      });
  },
});

export default newsSlice.reducer;