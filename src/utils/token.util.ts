import jwt, { sign } from "jsonwebtoken";

export const createTokenPair = async ({
  privateKey,
  publicKey,
  payload
}: {
  privateKey: string;
  publicKey: string;
  payload: object;
}) => {
  const accessToken = await sign(payload, publicKey, {
    expiresIn: '1h',
    // algorithm: 'RS256'
  });

  const refreshToken = await sign(payload, privateKey, {
    expiresIn: '7d',
    // algorithm: 'RS256'
  });

  return { accessToken, refreshToken };
}