import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom'; // 👈 Quan trọng: Import Link
import type { Article } from '../types/news';

interface NewsCardProps {
  article: Article;
  isFeatured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, isFeatured = false }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 👇 Dùng Link bao quanh toàn bộ thẻ để bấm được */}
      <CardActionArea component={Link} to={`/article/${article.id}`}> 
        
        <CardMedia
          component="img"
          height={isFeatured ? "400" : "200"}
          image={article.image || 'https://placehold.co/600x400'}
          alt={article.title}
        />
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant={isFeatured ? "h4" : "h6"}
            component="div"
            fontWeight="bold"
            sx={{
              '&:hover': { color: '#1976d2' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: isFeatured ? 3 : 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {article.title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
             {/* Chỉ hiện tóm tắt nếu là bài nổi bật */}
             {isFeatured && article.summary}
          </Typography>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {new Date(article.time || article.publish_date || Date.now()).toLocaleDateString('vi-VN')}
          </Typography>
        </CardContent>

      </CardActionArea>
    </Card>
  );
};

export default NewsCard;