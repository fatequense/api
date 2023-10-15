import * as crypto from 'node:crypto';

export function encrypt(data: any, key = process.env.COOKIE_SECRET_KEY) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    Buffer.from(key, 'base64'),
    iv,
  );
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(data)),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, encrypted, tag]);
}

export function decrypt<T>(
  encryptedData: Buffer | string,
  key = process.env.COOKIE_SECRET_KEY,
): T {
  if (typeof encryptedData === 'string')
    encryptedData = Buffer.from(encryptedData, 'base64');

  const iv = encryptedData.subarray(0, 16);
  const encrypted = encryptedData.subarray(16, encryptedData.length - 16);
  const tag = encryptedData.subarray(encryptedData.length - 16);

  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(key, 'base64'),
    iv,
  );
  decipher.setAuthTag(tag);

  const decrypted =
    decipher.update(encrypted, undefined, 'utf8') + decipher.final('utf8');
  return JSON.parse(decrypted);
}