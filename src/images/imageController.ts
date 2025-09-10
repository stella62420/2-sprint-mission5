import type { Request, Response, NextFunction } from 'express';
import { makeS3Key, uploadToS3 } from './s3Uploader';

export async function uploadSingle(req: Request, res: Response, next: NextFunction) {
  try {
    const file = req.file as Express.Multer.File | undefined;
    if (!file) return res.status(400).json({ message: 'image is required' });

    if (process.env.NODE_ENV === 'production') {
      const key = makeS3Key(file.originalname);
      const { url } = await uploadToS3(file.buffer, key, file.mimetype);
      return res.json({ url });
    }

    return res.json({ url: `/uploads/${file.filename}` });
  } catch (e) {
    next(e);
  }
}

export async function uploadMultiple(req: Request, res: Response, next: NextFunction) {
  try {
    const files = (req.files as Express.Multer.File[]) || [];
    if (!files.length) return res.status(400).json({ message: 'images are required' });

    if (process.env.NODE_ENV === 'production') {
      const urls: string[] = [];
      for (const f of files) {
        const key = makeS3Key(f.originalname);
        const { url } = await uploadToS3(f.buffer, key, f.mimetype);
        urls.push(url);
      }
      return res.json({ urls });
    }

    return res.json({ urls: files.map((f) => `/uploads/${f.filename}`) });
  } catch (e) {
    next(e);
  }
}
