import path from 'path';

export function makeS3Key(original: string) {
  const base = path.basename(original).replace(/[^a-zA-Z0-9._-]/g, '_');
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  const ts = now.getTime();
  return `uploads/${y}/${m}/${d}/${ts}_${base}`;
}

export async function uploadToS3(
  buffer: Buffer,
  key: string,
  contentType?: string
): Promise<{ key: string; url: string }> {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('uploadToS3 called outside production');
  }

  const bucket = process.env.S3_BUCKET!;
  const region = process.env.AWS_REGION!;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
  const publicBase =
    (process.env.S3_PUBLIC_BASE || `https://${bucket}.s3.${region}.amazonaws.com`).replace(/\/$/, '');

  const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');

  const client = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ACL: 'public-read',
      ContentType: contentType,
    })
  );

  return { key, url: `${publicBase}/${key}` };
}
