-- --- PHẦN 1: TẠO BẢNG (SCHEMA) ---

-- 1. Bảng Chuyên mục
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Người dùng (để test tính năng gợi ý cá nhân hóa)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng Bài viết
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    summary TEXT,           -- Tóm tắt hiển thị ngoài trang chủ
    content TEXT,           -- Nội dung chi tiết
    image_url VARCHAR(500), -- Link ảnh
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    view_count INT DEFAULT 0, -- Để làm tính năng "Tin đọc nhiều"
    publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'published'
);

-- 4. Bảng Tags (Từ khóa) - Cốt lõi của thuật toán gợi ý
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL
);

-- 5. Bảng trung gian Bài viết - Tags (Quan hệ n-n)
CREATE TABLE article_tags (
    article_id INT REFERENCES articles(id) ON DELETE CASCADE,
    tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

-- 6. Bảng Lịch sử đọc (Để gợi ý bài viết người dùng có thể thích)
CREATE TABLE read_history (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    article_id INT REFERENCES articles(id) ON DELETE CASCADE,
    read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --- PHẦN 2: THÊM DỮ LIỆU MẪU (SEED DATA) ---

-- Thêm Chuyên mục
INSERT INTO categories (name, slug) VALUES 
('Xã hội', 'xa-hoi'),
('Kinh tế', 'kinh-te'),
('Thể thao', 'the-thao'),
('Công nghệ', 'cong-nghe');

-- Thêm User mẫu
INSERT INTO users (username, email, full_name) VALUES 
('testuser', 'test@example.com', 'Nguyen Van A');

-- Thêm Tags
INSERT INTO tags (name, slug) VALUES 
('Bão số 3', 'bao-so-3'),
('Giá vàng', 'gia-vang'),
('Tuyển Việt Nam', 'tuyen-viet-nam'),
('iPhone 16', 'iphone-16'),
('AI', 'tri-tue-nhan-tao');

-- Thêm Bài viết mẫu
INSERT INTO articles (title, slug, summary, content, image_url, category_id, view_count, publish_date) VALUES 
('Bão số 3 gây mưa lớn diện rộng tại Hà Nội', 'bao-so-3-mua-lon', 'Cơ quan khí tượng cảnh báo người dân hạn chế ra đường để đảm bảo an toàn...', 'Nội dung chi tiết về bão...', 'https://placehold.co/600x400', 1, 1500, NOW()),
('Giá vàng SJC hôm nay lập đỉnh mới', 'gia-vang-lap-dinh', 'Thị trường vàng trong nước biến động mạnh phiên chiều nay...', 'Nội dung chi tiết giá vàng...', 'https://placehold.co/600x400', 2, 5000, NOW() - INTERVAL '2 hour'),
('Tuyển Việt Nam chốt danh sách đấu Thái Lan', 'tuyen-vn-dau-thai-lan', 'HLV Kim Sang Sik công bố 26 cái tên cho trận giao hữu sắp tới...', 'Nội dung bóng đá...', 'https://placehold.co/600x400', 3, 3000, NOW() - INTERVAL '5 hour'),
('Apple ra mắt iPhone 16 tích hợp AI', 'iphone-16-ai', 'Công nghệ Apple Intelligence là điểm nhấn trên dòng sản phẩm mới...', 'Nội dung công nghệ...', 'https://placehold.co/600x400', 4, 10000, NOW() - INTERVAL '1 day');

-- Gắn Tag cho bài viết
-- Bài 1 (Bão) gắn tag 'Bão số 3'
INSERT INTO article_tags (article_id, tag_id) VALUES (1, 1);

-- Bài 2 (Vàng) gắn tag 'Giá vàng'
INSERT INTO article_tags (article_id, tag_id) VALUES (2, 2);

-- Bài 3 (Bóng đá) gắn tag 'Tuyển VN'
INSERT INTO article_tags (article_id, tag_id) VALUES (3, 3);

-- Bài 4 (iPhone) gắn tag 'iPhone 16' và 'AI'
INSERT INTO article_tags (article_id, tag_id) VALUES (4, 4), (4, 5);

-- Thêm lịch sử đọc mẫu
INSERT INTO read_history (user_id, article_id) VALUES (1, 1), (1, 4);