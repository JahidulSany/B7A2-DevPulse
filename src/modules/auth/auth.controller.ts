import type { Request, Response } from 'express';
import { authService } from './auth.service.ts';
import sendResponse from '../../utils/sendResponse.ts';

const userSignup = async (req: Request, res: Response) => {
  try {
    const result = await authService.createUserAuthIntoDB(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User registered successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      errors: error,
    });
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const result = await authService.userLoginFromDB(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      errors: error,
    });
  }
};

export const authController = {
  userSignup,
  userLogin,
};
