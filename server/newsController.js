const db = require('./db');

// API lấy dữ liệu cho Trang chủ (Tin mới & Tin hot)
exports.getHomeData = async (req, res) => {
  try {
    // 1. Truy vấn 10 tin mới nhất (Sắp xếp theo ngày giảm dần)
    const latestQuery = `
      SELECT a.id, a.title, a.summary, a.image_url as image, c.name as category, a.publish_date as time
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      ORDER BY a.publish_date DESC 
      LIMIT 10
    `;
    const latestResult = await db.query(latestQuery);

    // 2. Truy vấn 5 tin đọc nhiều nhất (Trending - Sắp xếp theo view_count)
    const trendingQuery = `
      SELECT a.id, a.title, a.summary, a.image_url as image, c.name as category, a.publish_date as time
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      ORDER BY a.view_count DESC 
      LIMIT 5
    `;
    const trendingResult = await db.query(trendingQuery);

    // 3. Trả về đúng cấu trúc mà Redux bên Frontend đang đợi
    res.json({
      latest: latestResult.rows,
      trending: trendingResult.rows
    });

  } catch (err) {
    console.error('Lỗi lấy tin:', err);
    res.status(500).json({ message: 'Lỗi Server' });
  }
};
exports.getArticleDetail = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ đường dẫn (ví dụ: /api/news/1)
    
    // 1. Lấy thông tin bài viết + tên chuyên mục
    const query = `
      SELECT a.*, c.name as category
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      WHERE a.id = $1
    `;
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    }

    // 2. Tiện tay tăng view_count lên 1 (Tính năng đếm lượt xem)
    await db.query('UPDATE articles SET view_count = view_count + 1 WHERE id = $1', [id]);

    // 3. Trả về bài viết tìm được
    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi Server' });
  }
};

exports.getArticlesByCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const query = `
      SELECT a.*, c.name as category_name 
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      WHERE c.slug = $1
      ORDER BY a.publish_date DESC
    `;
    
    const result = await db.query(query, [slug]);
    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi Server' });
  }
};

exports.getRelatedArticles = async (req, res) => {
  try {
    const { categoryId, currentId } = req.query; // Lấy tham số từ URL
    
    // Lấy 3 bài cùng chuyên mục, trừ bài đang đọc
    const query = `
      SELECT id, title, image_url, publish_date 
      FROM articles 
      WHERE category_id = $1 AND id != $2
      ORDER BY publish_date DESC
      LIMIT 3
    `;
    
    const result = await db.query(query, [categoryId, currentId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi Server' });
  }
};

exports.searchArticles = async (req, res) => {
  try {
    const { q } = req.query; // Lấy từ khóa (keyword)
    
    if (!q) return res.json([]); // Nếu không có từ khóa thì trả về rỗng

    // Dùng ILIKE để tìm kiếm không phân biệt hoa thường (ví dụ: 'vn' tìm ra cả 'VN', 'Vn')
    const query = `
      SELECT a.*, c.name as category_name 
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      WHERE a.title ILIKE $1
      ORDER BY a.publish_date DESC
    `;
    
    // Thêm dấu % vào đầu và cuối để tìm tương đối (ví dụ: %bóng đá%)
    const result = await db.query(query, [`%${q}%`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi Server' });
  }
};