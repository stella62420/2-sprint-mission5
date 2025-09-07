"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imageController_1 = require("./imageController");
const router = (0, express_1.Router)();
let upload;
if (process.env.NODE_ENV === 'production') {
    upload = (0, multer_1.default)({
        storage: multer_1.default.memoryStorage(),
        limits: { fileSize: 10 * 1024 * 1024 },
    });
}
else {
    const uploadDir = path_1.default.resolve(process.cwd(), 'uploads');
    if (!fs_1.default.existsSync(uploadDir))
        fs_1.default.mkdirSync(uploadDir, { recursive: true });
    const storage = multer_1.default.diskStorage({
        destination: (_req, _file, cb) => cb(null, uploadDir),
        filename: (_req, file, cb) => {
            const ext = path_1.default.extname(file.originalname);
            const base = path_1.default.basename(file.originalname, ext).replace(/[^a-zA-Z0-9._-]/g, '_');
            cb(null, `${Date.now()}_${base}${ext}`);
        },
    });
    upload = (0, multer_1.default)({ storage, limits: { fileSize: 10 * 1024 * 1024 } });
}
router.post('/images', upload.single('image'), imageController_1.uploadSingle);
router.post('/images/bulk', upload.array('images', 5), imageController_1.uploadMultiple);
exports.default = router;
