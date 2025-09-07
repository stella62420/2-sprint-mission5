"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeS3Key = makeS3Key;
exports.uploadToS3 = uploadToS3;
const path_1 = __importDefault(require("path"));
function makeS3Key(original) {
    const base = path_1.default.basename(original).replace(/[^a-zA-Z0-9._-]/g, '_');
    const now = new Date();
    const y = now.getUTCFullYear();
    const m = String(now.getUTCMonth() + 1).padStart(2, '0');
    const d = String(now.getUTCDate()).padStart(2, '0');
    const ts = now.getTime();
    return `uploads/${y}/${m}/${d}/${ts}_${base}`;
}
async function uploadToS3(buffer, key, contentType) {
    if (process.env.NODE_ENV !== 'production') {
        throw new Error('uploadToS3 called outside production');
    }
    const bucket = process.env.S3_BUCKET;
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const publicBase = (process.env.S3_PUBLIC_BASE || `https://${bucket}.s3.${region}.amazonaws.com`).replace(/\/$/, '');
    const { S3Client, PutObjectCommand } = await Promise.resolve().then(() => __importStar(require('@aws-sdk/client-s3')));
    const client = new S3Client({
        region,
        credentials: { accessKeyId, secretAccessKey },
    });
    await client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ACL: 'public-read',
        ContentType: contentType,
    }));
    return { key, url: `${publicBase}/${key}` };
}
