import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid as Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import NewsCard from './NewsCard';

const CategoryPage = () => {
  const { slug } = useParams(); // Lấy slug từ URL (ví dụ: 'the-thao')
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Map slug sang tên hiển thị tiếng Việt cho đẹp
  const categoryNames: Record<string, string> = {
    'xa-hoi': 'Xã Hội',
    'kinh-te': 'Kinh Tế',
    'the-gioi': 'Thế Giới',
    'the-thao': 'Thể Thao',
    'cong-nghe': 'Công Nghệ',
    'giai-tri': 'Giải Trí'
  };

  useEffect(() => {
    setLoading(true);
    // Gọi API lọc tin theo danh mục
    fetch(`http://localhost:5000/api/news/category/${slug}`)
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]); // Mỗi khi slug thay đổi (bấm menu khác) thì chạy lại

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8, minHeight: '60vh' }}>
      <Typography 
        variant="h4" 
        color="primary" 
        fontWeight="bold" 
        sx={{ mb: 4, textTransform: 'uppercase', borderBottom: '2px solid #1976d2', display: 'inline-block', pb: 1 }}
      >
        {categoryNames[slug || ''] || 'Tin tức'}
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
        <Alert severity="info">Chưa có bài viết nào trong mục này.</Alert>
      )}
    </Container>
  );
};

export default CategoryPage;