import { Router } from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
const imagesRouter = Router();

// 단일 이미지 업로드 (Article 용)
imagesRouter.post('/single', upload.single('image'), (req, res) => {
  const url = `/uploads/${req.file?.filename}`;
  res.json({ url });
});

// 다중 이미지 업로드 (Product 용)
imagesRouter.post('/multiple', upload.array('images', 5), (req, res) => {
  const urls = (req.files as Express.Multer.File[]).map(f => `/uploads/${f.filename}`);
  res.json({ urls });
});

export default imagesRouter;
