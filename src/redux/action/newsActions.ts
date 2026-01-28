import { createAsyncThunk } from '@reduxjs/toolkit';
import { NEWS_TYPES } from '../types/newsTypes';
import type { Article } from '../../types/news'; // Đảm bảo đường dẫn import đúng

// Giả lập delay API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Định nghĩa kiểu dữ liệu trả về của Thunk
interface FetchNewsResponse {
  latest: Article[];
  trending: Article[];
}

export const getNewsList = createAsyncThunk<FetchNewsResponse, void>(
  NEWS_TYPES.GET_NEWS,
  async (_, { rejectWithValue }) => {
    try {
      // Giả lập gọi API mất 0.8 giây
      await delay(800);

      return {
        latest: [
          {
            id: 1,
            title: 'Bão số 3: Hàng loạt cây xanh gãy đổ tại Hà Nội',
            summary: 'Cơ quan khí tượng cảnh báo người dân hạn chế ra đường để đảm bảo an toàn...',
            image: 'https://placehold.co/800x500',
            category: 'Xã hội',
            time: '1 giờ trước'
          },
          {
            id: 2,
            title: 'Giá vàng SJC "quay xe" giảm mạnh chiều nay',
            summary: 'Áp lực chốt lời khiến giá vàng đảo chiều giảm sâu sau chuỗi ngày tăng nóng.',
            image: 'https://placehold.co/600x400',
            category: 'Kinh tế',
            time: '2 giờ trước'
          },
          {
            id: 3,
            title: 'Tuyển Việt Nam công bố đội hình đấu Thái Lan',
            summary: 'HLV Kim Sang Sik đưa ra những thử nghiệm mới ở hàng phòng ngự.',
            image: 'https://placehold.co/600x400',
            category: 'Thể thao',
            time: '30 phút trước'
          },
          {
            id: 4,
            title: 'iPhone 16 Pro Max lộ diện màu Titan mới',
            summary: 'Hình ảnh rò rỉ cho thấy thiết kế camera thay đổi và màu sắc sang trọng hơn.',
            image: 'https://placehold.co/600x400',
            category: 'Công nghệ',
            time: '5 giờ trước'
          },
          {
            id: 5,
            title: 'Du lịch dịp lễ 2/9: Vé máy bay hạ nhiệt',
            summary: 'Các hãng hàng không tăng chuyến phục vụ nhu cầu đi lại của người dân.',
            image: 'https://placehold.co/600x400',
            category: 'Đời sống',
            time: '1 ngày trước'
          },
        ],
        // FIX LỖI Ở ĐÂY: Đã điền đầy đủ thông tin cho tin Trending
        trending: [
          {
            id: 101,
            title: 'Vụ án Vạn Thịnh Phát: Diễn biến mới nhất tại tòa',
            summary: 'Tóm tắt nội dung vụ án đang được dư luận quan tâm...', // Bắt buộc
            image: 'https://placehold.co/100x100', // Bắt buộc
            category: 'Pháp luật', // Bắt buộc
            time: 'Vừa xong'
          },
          {
            id: 102,
            title: 'Xăng dầu đồng loạt giảm giá từ 15h chiều nay',
            summary: 'Giá xăng E5 RON 92 giảm 300 đồng/lít...',
            image: 'https://placehold.co/100x100',
            category: 'Kinh tế',
            time: '1 giờ trước'
          },
          {
            id: 103,
            title: 'Đề xuất nghỉ Tết Nguyên đán 2026 9 ngày',
            summary: 'Bộ Lao động đang lấy ý kiến các bộ ngành về phương án nghỉ Tết.',
            image: 'https://placehold.co/100x100',
            category: 'Xã hội',
            time: '3 giờ trước'
          },
          {
            id: 104,
            title: 'Lịch thi đấu Ngoại hạng Anh cuối tuần này',
            summary: 'Tâm điểm là trận đại chiến giữa Man City và Arsenal.',
            image: 'https://placehold.co/100x100',
            category: 'Thể thao',
            time: '5 giờ trước'
          },
          {
            id: 105,
            title: 'Cảnh báo thủ đoạn lừa đảo mới qua Telegram',
            summary: 'Cơ quan công an cảnh báo người dân cảnh giác với các chiêu trò mới.',
            image: 'https://placehold.co/100x100',
            category: 'Pháp luật',
            time: 'Hôm qua'
          },
        ]
      };
    } catch (error) {
      return rejectWithValue('Lỗi tải dữ liệu từ máy chủ');
    }
  }
);