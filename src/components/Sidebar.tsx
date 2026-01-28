import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Box } from '@mui/material';
import type { Article } from '../types/news';

interface SidebarProps {
  articles: Article[];
}

const Sidebar: React.FC<SidebarProps> = ({ articles }) => {
  return (
    <Paper elevation={0} sx={{ bgcolor: 'transparent' }}>
      <Box sx={{ borderBottom: '2px solid #b31f24', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#b31f24', fontWeight: 'bold', textTransform: 'uppercase', display: 'inline-block', borderBottom: '2px solid #b31f24', mb: -0.25 }}>
          Đọc Nhiều
        </Typography>
      </Box>

      <List disablePadding>
        {articles.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
              <ListItemAvatar sx={{ minWidth: 40 }}>
                <Avatar sx={{ 
                  bgcolor: index < 3 ? '#e0e0e0' : 'transparent', 
                  color: index < 3 ? '#333' : '#999',
                  fontWeight: 'bold', width: 24, height: 24, fontSize: '0.8rem' 
                }}>
                  {index + 1}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight="bold" sx={{ '&:hover': { color: '#b31f24', cursor: 'pointer' } }}>
                    {item.title}
                  </Typography>
                }
              />
            </ListItem>
            {index < articles.length - 1 && <Divider variant="inset" component="li" sx={{ ml: 5 }} />}
          </React.Fragment>
        ))}
      </List>
      
      <Box sx={{ mt: 4, height: 300, bgcolor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
        QUẢNG CÁO
      </Box>
    </Paper>
  );
};

export default Sidebar;