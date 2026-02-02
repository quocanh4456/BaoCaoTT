import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid as Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import NewsCard from './NewsCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // Lấy chữ sau dấu ?q=...
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`http://localhost:5000/api/news/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          setArticles(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8, minHeight: '60vh' }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Kết quả tìm kiếm cho: <strong>"{query}"</strong>
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center"><CircularProgress /></Box>
      ) : articles.length > 0 ? (
        <Grid container spacing={3}>
          {articles.map((article) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
              <NewsCard article={article} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="warning">Không tìm thấy bài viết nào phù hợp.</Alert>
      )}
    </Container>
  );
};

export default SearchPage;