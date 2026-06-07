import type { Request, Response } from 'express';
import { issueService } from './issue.service';
import sendResponse from '../../utils/sendResponse';

const createIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.createIssueIntoDB(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Issue Created successfully',
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

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssuesFromDB(req.body);

    // if (result.rows.length === 0) {
    //   sendResponse(res, {
    //     statusCode: 404,
    //     success: false,
    //     message: 'User not found',
    //     data: {},
    //   });
    // }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All Issues retrieved successfully',
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
  try {
    const result = await issueService.getSignleIssueFromDB(req.body);

    // if (result.rows.length === 0) {
    //   sendResponse(res, {
    //     statusCode: 404,
    //     success: false,
    //     message: 'User not found',
    //     data: {},
    //   });
    // }

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
  try {
    const result = await issueService.updateIssueFromDB(req.body);

    // if (result.rows.length === 0) {
    //   sendResponse(res, {
    //     statusCode: 404,
    //     success: false,
    //     message: 'User not found',
    //     data: {},
    //   });
    // }

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
  try {
    const result = await issueService.deleteIssueFromDB(req.body);

    // if (result.rows.length === 0) {
    //   sendResponse(res, {
    //     statusCode: 404,
    //     success: false,
    //     message: 'User not found',
    //     data: {},
    //   });
    // }

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
