import type { Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import sendResponse from '../../utils/sendResponse';
import { issueService } from './issue.service';

const createIssue = async (req: Request, res: Response) => {
  // console.log(req.user);
  const { id } = req.user as JwtPayload;
  try {
    const result = await issueService.createIssueIntoDB(req.body, id);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Issue Created successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  const sort = (req.query.sort as string) || 'newest';
  const type = req.query.type as string;
  const status = req.query.status as string;
  try {
    const result = await issueService.getAllIssuesFromDB({
      sort,
      type,
      status,
    });

    if (result.length === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'No issues found',
        data: {},
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All issues retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await issueService.getSingleIssueFromDB(id as string);

    if (result.length === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'No issues found',
        data: {},
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Issue retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: userId, role: userRole } = req.user as JwtPayload;
  try {
    const result = await issueService.updateIssueFromDB(
      req.body,
      id as string,
      userId,
      userRole,
    );

    if (result.rows.length === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'No issues found',
        data: {},
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Issue updated successfully',
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role: userRole } = req.user as JwtPayload;
  try {
    const result = await issueService.deleteIssueFromDB(userRole, id as string);

    if (result.length === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'No issues found',
        data: {},
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Issue deleted successfully',
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
