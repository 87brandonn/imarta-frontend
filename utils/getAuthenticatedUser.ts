import jwt from 'jsonwebtoken';
import { GoogleAuth } from '../pages/admin';

const getAuthenticatedUser = (cookies?: string) => {
  if (!cookies) return false;
  const data: GoogleAuth = jwt.verify(
    cookies,
    process.env.NEXT_PUBLIC_TOKEN_SECRET as string
  ) as GoogleAuth;
  return data.email === 'imarta.untar@gmail.com';
};

export default getAuthenticatedUser;
