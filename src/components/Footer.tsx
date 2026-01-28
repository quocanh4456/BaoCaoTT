import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#222', color: '#fff', py: 6, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, fontStyle: 'italic' }}>
              VTC NEWS
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa', lineHeight: 1.8 }}>
              Báo điện tử News - Đài Tiếng nói Việt Nam.<br/>
              Giấy phép hoạt động báo chí điện tử số 335/GP-BTTTT.<br/>
              Tổng Biên tập: Ngô Thiệu Phong.<br/>
              Tòa soạn: Tầng 12A, Tòa nhà VTC Online, 18 Tam Trinh, Hà Nội.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Grid container spacing={2}>
              {['Xã hội', 'Kinh tế', 'Pháp luật', 'Thể thao', 'Thế giới', 'Công nghệ', 'Sức khỏe', 'Đời sống'].map((item) => (
                <Grid size={{ xs: 6, sm: 3 }} key={item}>
                  <Link href="#" underline="hover" sx={{ color: '#ddd', fontSize: '0.9rem' }}>
                    {item}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: '1px solid #444', mt: 4, pt: 2, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#666' }}>
            © 2026 VTC News. All rights reserved. Clone by React/Redux/MUI.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;