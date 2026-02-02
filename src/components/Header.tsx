import React, { useState } from 'react'; // 1. Import useState
import { AppBar, Toolbar, Typography, Container, Box, InputBase, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom'; // 2. Import useNavigate

const Header: React.FC = () => {
  // Danh sách Menu khớp với Database
  const menuItems = [
    { name: 'XÃ HỘI', slug: 'xa-hoi' },
    { name: 'KINH TẾ', slug: 'kinh-te' },
    { name: 'THẾ GIỚI', slug: 'the-gioi' },
    { name: 'THỂ THAO', slug: 'the-thao' },
    { name: 'CÔNG NGHỆ', slug: 'cong-nghe' },
    { name: 'GIẢI TRÍ', slug: 'giai-tri' },
  ];

  // --- LOGIC TÌM KIẾM ---
  const [keyword, setKeyword] = useState(''); // Lưu từ khóa người dùng gõ
  const navigate = useNavigate(); // Hàm chuyển trang

  const handleSearch = () => {
    if (keyword.trim()) {
      // Chuyển sang trang kết quả kèm từ khóa
      navigate(`/search?q=${keyword}`);
      setKeyword(''); // Xóa trắng ô tìm kiếm sau khi ấn
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  // ----------------------

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#1976d2' }} elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 64 }}>
          
          {/* 1. LOGO VTC NEWS */}
          <Typography
            variant="h4"
            noWrap
            component={Link} 
            to="/" 
            sx={{
              mr: 4,
              fontFamily: 'sans-serif',
              fontWeight: 900,
              fontStyle: 'italic',
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 }
            }}
          >
            VTC NEWS
          </Typography>

          {/* 2. MENU ĐIỀU HƯỚNG */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.slug}
                component={Link}
                to={`/category/${item.slug}`}
                sx={{ 
                    color: 'white', 
                    fontWeight: 'bold', 
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } 
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* 3. THANH TÌM KIẾM (ĐÃ SỬA LOGIC) */}
          <Box sx={{ 
              position: 'relative', 
              bgcolor: 'rgba(255,255,255,0.15)', 
              borderRadius: 1, 
              px: 2, 
              py: 0.5, 
              display: 'flex', 
              alignItems: 'center',
              ml: 2
            }}
          >
            {/* Bấm icon kính lúp cũng tìm luôn */}
            <SearchIcon 
              sx={{ color: 'white', mr: 1, cursor: 'pointer' }} 
              onClick={handleSearch}
            />
            
            <InputBase
              placeholder="Tìm kiếm..."
              sx={{ color: 'white', width: { xs: 100, md: 150 } }}
              inputProps={{ 'aria-label': 'search' }}
              
              // Kết nối logic vào đây
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)} // Cập nhật text khi gõ
              onKeyDown={handleKeyDown} // Bắt sự kiện phím Enter
            />
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;