
-- 1. 내 정보 업데이트 하기 (닉네임을 "test"로)
UPDATE users
SET nickname = 'test'
WHERE id = 1;

-- 2. 내가 생성한 상품 조회 (3번째 페이지, 10개씩, 최신순)
SELECT *
FROM products
WHERE user_id = 1
ORDER BY created_at DESC
LIMIT 10 OFFSET 20;

-- 3. 내가 생성한 상품의 총 개수
SELECT COUNT(*) AS product_count
FROM products
WHERE user_id = 1;

-- 4. 내가 좋아요 누른 상품 조회 (3번째 페이지, 10개씩, 최신순)
SELECT p.*
FROM products p
JOIN product_likes pl ON p.id = pl.product_id
WHERE pl.user_id = 1
ORDER BY pl.created_at DESC
LIMIT 10 OFFSET 20;

-- 5. 내가 좋아요 누른 상품의 총 개수
SELECT COUNT(*) AS liked_count
FROM product_likes
WHERE user_id = 1;

-- 6. 상품 생성
INSERT INTO products (user_id, title, description, price, image_url)
VALUES (1, '예시 상품', '설명입니다.', 10000, 'https://example.com/image.jpg');

-- 7. 상품 목록 조회 ("test"로 검색 + 좋아요 개수 포함)
SELECT p.*, 
       (SELECT COUNT(*) FROM product_likes WHERE product_id = p.id) AS like_count
FROM products p
WHERE title LIKE '%test%'
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;

-- 8. 상품 상세 조회 (1번 상품)
SELECT p.*, 
       u.nickname AS seller_nickname,
       (SELECT COUNT(*) FROM product_likes WHERE product_id = p.id) AS like_count
FROM products p
JOIN users u ON p.user_id = u.id
WHERE p.id = 1;

-- 9. 상품 수정 (1번 상품)
UPDATE products
SET title = '수정된 상품명',
    description = '수정된 설명',
    price = 12000,
    image_url = 'https://example.com/updated.jpg'
WHERE id = 1;

-- 10. 상품 삭제 (1번 상품)
DELETE FROM products
WHERE id = 1;

-- 11. 상품 좋아요 (1번 유저가 2번 상품 좋아요)
INSERT INTO product_likes (user_id, product_id)
VALUES (1, 2);

-- 12. 상품 좋아요 취소 (1번 유저가 2번 상품 좋아요 취소)
DELETE FROM product_likes
WHERE user_id = 1 AND product_id = 2;

-- 13. 상품 댓글 작성 (1번 유저가 2번 상품에 댓글 작성)
INSERT INTO product_comments (user_id, product_id, content)
VALUES (1, 2, '이 상품 괜찮네요!');

-- 14. 상품 댓글 조회 (1번 상품, 최신순, 커서 기반 페이지네이션)
SELECT *
FROM product_comments
WHERE product_id = 1
  AND created_at < '2025-03-25 23:59:59'
ORDER BY created_at DESC
LIMIT 10;
