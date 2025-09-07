"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingle = uploadSingle;
exports.uploadMultiple = uploadMultiple;
const s3Uploader_1 = require("./s3Uploader");
async function uploadSingle(req, res, next) {
    try {
        const file = req.file;
        if (!file)
            return res.status(400).json({ message: 'image is required' });
        if (process.env.NODE_ENV === 'production') {
            const key = (0, s3Uploader_1.makeS3Key)(file.originalname);
            const { url } = await (0, s3Uploader_1.uploadToS3)(file.buffer, key, file.mimetype);
            return res.json({ url });
        }
        return res.json({ url: `/uploads/${file.filename}` });
    }
    catch (e) {
        next(e);
    }
}
async function uploadMultiple(req, res, next) {
    try {
        const files = req.files || [];
        if (!files.length)
            return res.status(400).json({ message: 'images are required' });
        if (process.env.NODE_ENV === 'production') {
            const urls = [];
            for (const f of files) {
                const key = (0, s3Uploader_1.makeS3Key)(f.originalname);
                const { url } = await (0, s3Uploader_1.uploadToS3)(f.buffer, key, f.mimetype);
                urls.push(url);
            }
            return res.json({ urls });
        }
        return res.json({ urls: files.map((f) => `/uploads/${f.filename}`) });
    }
    catch (e) {
        next(e);
    }
}
