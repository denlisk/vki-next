import crypto from 'node:crypto';

const getSecretKey = (): string => {
  const secret = process.env.PASSWORD_SECRET_KEY;

  if (!secret) {
    throw new Error('PASSWORD_SECRET_KEY is not set');
  }

  return secret;
};

export const hashPassword = (Password: string): string => {
  return crypto
    .createHmac('sha256', getSecretKey())
    .update(Password)
    .digest('hex');
};

export const verifyPassword = (Password: string, hashedPassword: string): boolean => {
  return hashPassword(Password) === hashedPassword;
};
