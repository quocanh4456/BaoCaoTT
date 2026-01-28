import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box, Button, IconButton, Container } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(1), width: 'auto' },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: { width: '12ch', '&:focus': { width: '20ch' } },
  },
}));

const Header: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 0, mr: 4, fontStyle: 'italic', fontWeight: '900' }}>
            VTC NEWS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {['Xã hội', 'Kinh tế', 'Thế giới', 'Thể thao', 'Công nghệ'].map((page) => (
              <Button key={page} sx={{ color: 'white', fontWeight: 'bold' }}>{page}</Button>
            ))}
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Tìm kiếm…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;