import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks'; // Dùng hooks đã type
import { getNewsList } from './redux/action/newsActions';
import { Container, Grid, Box, CircularProgress, Divider, Typography } from '@mui/material';

import Header from './components/Header';
import BreakingNews from './components/BreakingNews';
import NewsCard from './components/NewsCard';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  // Bây giờ TS sẽ tự gợi ý latestArticles, trendingArticles... khi bạn gõ
  const { latestArticles, trendingArticles, loading } = useAppSelector((state) => state.news);
  console.log('Latest Articles:', latestArticles);
  useEffect(() => {
    dispatch(getNewsList());
  }, [dispatch]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>
      <Header />
      <BreakingNews />

      <Container maxWidth="lg" sx={{ mt: 4, flexGrow: 1 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>
        ) : (
          <Grid container spacing={4}>
            {/* MAIN CONTENT */}
            <Grid size={{ xs: 12, md: 8 }}>
              {latestArticles.length > 0 && (
                <Box mb={4}>
                   <NewsCard article={latestArticles[0]} isFeatured={true} />
                </Box>
              )}

              <Divider sx={{ mb: 3 }} />

              <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mb: 2, textTransform: 'uppercase' }}>
                Tin Mới Nhất
              </Typography>
              
              <Grid container spacing={3}>
                {latestArticles.slice(1).map((article) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={article.id}>
                    <NewsCard article={article} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* SIDEBAR */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ position: 'sticky', top: 20 }}>
                <Sidebar articles={trendingArticles} />
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
      <Footer />
    </Box>
  );
}

export default App;