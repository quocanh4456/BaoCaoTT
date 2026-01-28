// Định nghĩa cấu trúc của một bài báo
export interface Article {
  id: number;
  title: string;
  summary?: string; // Dấu ? nghĩa là có thể null/undefined
  image: string;
  category: string;
  time?: string;
}

// Định nghĩa cấu trúc response từ API (dựa theo code mock trước đó)
export interface NewsApiResponse {
  latest: Article[];
  trending: Article[];
}

// Định nghĩa State của Redux
export interface NewsState {
  latestArticles: Article[];
  trendingArticles: Article[];
  loading: boolean;
  error: string | null;
}