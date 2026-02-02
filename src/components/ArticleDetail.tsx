import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, Typography, Box, Chip, Divider, 
  CircularProgress, Breadcrumbs, Avatar, Grid as Grid 
} from '@mui/material'; // Lưu ý: Grid2 nếu dùng MUI v6, hoặc Grid nếu v5
import { Home, LocalOffer } from '@mui/icons-material';
import NewsCard from './NewsCard'; // Tái sử dụng thẻ tin có sẵn

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [relatedNews, setRelatedNews] = useState<any[]>([]); // Chứa tin liên quan
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu khi chuyển bài
    setLoading(true);
    
    // 1. Lấy bài viết chính
    fetch(`http://localhost:5000/api/news/${id}`)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        setLoading(false);

        // 2. Nếu có bài viết -> Gọi tiếp API lấy tin liên quan
        if (data && data.category_id) {
          fetch(`http://localhost:5000/api/news/related?categoryId=${data.category_id}&currentId=${id}`)
            .then(res => res.json())
            .then(related => setRelatedNews(related))
            .catch(err => console.error("Lỗi lấy tin liên quan:", err));
        }
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;
  if (!article) return <Box mt={10} textAlign="center">Không tìm thấy bài viết</Box>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 10 }}>
      {/* --- PHẦN BÀI VIẾT CHÍNH (Giữ nguyên) --- */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', color: '#666', textDecoration: 'none' }}>
          <Home sx={{ mr: 0.5 }} fontSize="inherit" /> Trang chủ
        </Link>
        <Typography color="text.primary" fontWeight="bold">{article.category}</Typography>
      </Breadcrumbs>

      <Typography variant="h3" fontWeight="800" sx={{ mb: 3, fontFamily: 'serif', lineHeight: 1.3 }}>
        {article.title}
      </Typography>

      <Box display="flex" alignItems="center" mb={4} sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
        <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>V</Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight="bold">Ban Biên Tập VTC News</Typography>
          <Typography variant="caption" color="text.secondary">
             {new Date(article.publish_date).toLocaleString('vi-VN')}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, fontStyle: 'italic', borderLeft: '4px solid #c00', pl: 2 }}>
        {article.summary}
      </Typography>

      <Box 
        sx={{ typography: 'body1', fontSize: '1.2rem', lineHeight: 1.8, '& img': { maxWidth: '100%', height: 'auto', my: 2, borderRadius: 2 } }}
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />

      <Box mt={4} display="flex" gap={1}>
        <LocalOffer color="action" fontSize="small" />
        <Chip label={article.category} size="small" clickable />
        <Chip label="Tin nóng" size="small" clickable />
      </Box>

      {/* --- PHẦN TIN LIÊN QUAN (Mới thêm) --- */}
      <Divider sx={{ my: 6 }} />
      
      {relatedNews.length > 0 && (
        <Box>
          <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 3, textTransform: 'uppercase', borderLeft: '5px solid #1976d2', pl: 2 }}>
            Tin Cùng Chuyên Mục
          </Typography>
          
          <Grid container spacing={3}>
            {relatedNews.map((news) => (
              <Grid size={{ xs: 12, sm: 4 }} key={news.id}>
                {/* Tái sử dụng thẻ NewsCard nhưng hiển thị nhỏ gọn */}
                <NewsCard article={news} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ArticleDetail;