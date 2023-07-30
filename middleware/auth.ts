import config from 'config'
import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express';

interface ResponseAndUser extends Request { user?: string }

function auth(req: ResponseAndUser, res: Response, next: NextFunction) {

  // Get token from header
  const token = req.header('x-auth-token');
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  console.log('auth middlewarwe')
  // Verify token
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        if (decoded && typeof decoded !== "string")
          req.user = decoded?.user;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }

};
export default auth

