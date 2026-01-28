import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, Chip, Box } from '@mui/material';
import type { Article } from '../types/news';

// Định nghĩa kiểu dữ liệu cho Props
interface NewsCardProps {
  article: Article;
  isFeatured?: boolean; // Optional prop
}

const NewsCard: React.FC<NewsCardProps> = ({ article, isFeatured = false }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <CardMedia
          component="img"
          height={isFeatured ? "350" : "180"}
          image={article.image}
          alt={article.title}
        />
        
        {isFeatured ? (
          <Box sx={{ 
            position: 'absolute', bottom: 0, left: 0, width: '100%', 
            bgcolor: 'rgba(0, 0, 0, 0.7)', color: 'white', p: 2 
          }}>
            <Chip label={article.category} color="error" size="small" sx={{ mb: 1 }} />
            <Typography variant="h4" component="div" fontWeight="bold">
              {article.title}
            </Typography>
          </Box>
        ) : (
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="caption" component="div" color="error" fontWeight="bold">
              {article.category.toUpperCase()}
            </Typography>
            <Typography gutterBottom variant="h6" component="div" lineHeight={1.2}>
              {article.title}
            </Typography>
            {article.summary && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {article.summary}
              </Typography>
            )}
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
};

export default NewsCard;