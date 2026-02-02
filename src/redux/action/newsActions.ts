import { createAsyncThunk } from '@reduxjs/toolkit';
import { NEWS_TYPES } from '../types/newsTypes';
// Import Interface để đảm bảo đúng kiểu dữ liệu
import { type NewsApiResponse } from '../../types/news';

export const getNewsList = createAsyncThunk<NewsApiResponse>(
  NEWS_TYPES.GET_NEWS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/news');

      if (!response.ok) {
        throw new Error('Không thể kết nối tới Server');
      }

      // Biến đổi dữ liệu JSON từ API thành Object
      const data = await response.json();
      
      // Trả về dữ liệu cho Redux (gồm latest và trending)
      return data; 

    } catch (error) {
      console.error('Lỗi gọi API:', error);
      return rejectWithValue('Lỗi tải dữ liệu');
    }
  }
);