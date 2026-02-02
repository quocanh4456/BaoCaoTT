import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getNewsList } from './redux/action/newsActions';
import { Container, Grid as Grid, Box, CircularProgress, Divider, Typography } from '@mui/material';

// Import các components
import Header from './components/Header';
import BreakingNews from './components/BreakingNews';
import NewsCard from './components/NewsCard';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ArticleDetail from './components/ArticleDetail';
import CategoryPage from './components/CategoryPage'; 
import SearchPage from './components/SearchPage'; // 👈 Đã import trang tìm kiếm

// --- 1. Component Trang chủ (HomePage) ---
// Chứa logic hiển thị tin mới nhất & sidebar
const HomePage = () => {
  const dispatch = useAppDispatch();
  const { latestArticles, trendingArticles, loading } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNewsList());
  }, [dispatch]);

  if (loading) {
    return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;
  }

  return (
    <>
      <BreakingNews />
      <Container maxWidth="lg" sx={{ mt: 4, flexGrow: 1 }}>
        <Grid container spacing={4}>
          {/* CỘT TRÁI: TIN CHÍNH */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Tin nổi bật nhất (To nhất) */}
            {latestArticles.length > 0 && (
              <Box mb={4}>
                <NewsCard article={latestArticles[0]} isFeatured={true} />
              </Box>
            )}

            <Divider sx={{ mb: 3 }} />

            <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mb: 2, textTransform: 'uppercase' }}>
              Tin Mới Nhất
            </Typography>

            {/* Danh sách các tin tiếp theo */}
            <Grid container spacing={3}>
              {latestArticles.slice(1).map((article) => (
                <Grid size={{ xs: 12, sm: 6 }} key={article.id}>
                  <NewsCard article={article} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* CỘT PHẢI: SIDEBAR (Tin đọc nhiều) */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: 'sticky', top: 20 }}>
              <Sidebar articles={trendingArticles} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

// --- 2. Component App Chính (Chứa định tuyến Routing) ---
const App: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>
      {/* Header luôn hiển thị */}
      <Header />
      
      {/* Phần nội dung thay đổi theo đường dẫn */}
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          {/* 1. Trang chủ */}
          <Route path="/" element={<HomePage />} />
          
          {/* 2. Trang tìm kiếm (MỚI THÊM) */}
          <Route path="/search" element={<SearchPage />} />
          
          {/* 3. Trang danh mục (Ví dụ: /category/the-thao) */}
          <Route path="/category/:slug" element={<CategoryPage />} />

          {/* 4. Trang chi tiết bài viết (Ví dụ: /article/1) */}
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </Box>

      {/* Footer luôn hiển thị */}
      <Footer />
    </Box>
  );
}

export default App;