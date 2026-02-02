const express = require('express');
const cors = require('cors');
const db = require('./db'); 
const newsController = require('./newsController'); // 1. Import Controller mới

// (Nếu bạn sửa trực tiếp pass trong db.js rồi thì dòng dotenv này có hay không cũng được)
require('dotenv').config(); 

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// --- CÁC ROUTE API ---

// 2. Route lấy dữ liệu trang chủ (Thay thế cái test cũ)
app.get('/api/news', newsController.getHomeData);
app.get('/api/news/related', newsController.getRelatedArticles);
app.get('/api/news/category/:slug', newsController.getArticlesByCategory);
app.get('/api/news/search', newsController.searchArticles);
app.get('/api/news/:id', newsController.getArticleDetail);

app.get('/', (req, res) => {
  res.send('Server VTC News đang chạy ngon lành!');
});

app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${port}`);
});