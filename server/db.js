const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  // 👇 Thay vì dùng process.env, bạn điền thẳng thông tin vào đây
  user: 'postgres',
  host: 'localhost',
  database: 'postgres', // Tên database mặc định
  password: '123456', // ⚠️ Thay đúng mật khẩu bạn tạo lúc cài Postgre
  port: 5432,
});

pool.on('connect', () => {
  console.log('✅ Đã kết nối thành công tới PostgreSQL!');
});

pool.on('error', (err) => {
  console.error('❌ Lỗi kết nối Database:', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};