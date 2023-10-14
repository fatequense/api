import type { Algorithm, JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export function jwtSign(payload: string | object | Buffer) {
  const jwtOptions: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN,
    algorithm: process.env.JWT_ALGORITHM as Algorithm,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, jwtOptions);
}

export function jwtVerify(token: string) {
  const jwtOptions: VerifyOptions = {
    algorithms: [process.env.JWT_ALGORITHM as Algorithm]
  };

  return jwt.verify(token, process.env.JWT_SECRET, jwtOptions) as JwtPayload;
}