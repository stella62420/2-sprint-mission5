import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { uploadSingle, uploadMultiple } from './imageController';

const router = Router();

let upload: multer.Multer;

if (process.env.NODE_ENV === 'production') {
  upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
  });
} else {
  const uploadDir = path.resolve(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9._-]/g, '_');
      cb(null, `${Date.now()}_${base}${ext}`);
    },
  });

  upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });
}

router.post('/images', upload.single('image'), uploadSingle);
router.post('/images/bulk', upload.array('images', 5), uploadMultiple);

export default router;
