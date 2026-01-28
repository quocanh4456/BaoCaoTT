import React from 'react';
import { Box, Typography, Container, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const BreakingNews = () => {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0', py: 1 }}>
      <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography 
          variant="subtitle2" 
          sx={{ color: '#b31f24', fontWeight: 'bold', display: 'flex', alignItems: 'center', mr: 2 }}
        >
          <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
          NÓNG:
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, flexGrow: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Trực tiếp: Quốc hội thảo luận về Luật Đất đai sửa đổi - Nhiều điểm mới đáng chú ý...
        </Typography>
      </Container>
    </Box>
  );
};

export default BreakingNews;