import type { NextFunction, Request, Response } from 'express';
import sendResponse from '../utils/sendResponse.ts';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '../config/index.ts';
import { pool } from '../db/index.ts';
import type { TUserRole } from '../types/index.ts';

const auth = (...roles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        sendResponse(res, {
          statusCode: 401,
          success: false,
          message: 'Unauthorized Access!',
        });
      }

      const decoded = jwt.verify(
        token as string,
        config.secret_key as string,
      ) as JwtPayload;

      const userData = await pool.query(
        `
      SELECT * FROM users WHERE id=$1
      `,
        [decoded.id],
      );

      const user = userData.rows[0];

      if (!user) {
        sendResponse(res, {
          statusCode: 404,
          success: false,
          message: 'User not found!',
        });
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
