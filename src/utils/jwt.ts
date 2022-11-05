import { ENV } from '@constants/env';
import * as jose from 'jose';

const secret = new TextEncoder().encode(ENV.JWT.SECRET);

const jwt = {
  verify: async (token: string) => {
    return jose.jwtVerify(token, secret);
  },

  sign: async (payload: jose.JWTPayload) => {
    return new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(ENV.JWT.EXPIRATION)
      .sign(secret);
  },
};

export default jwt;
