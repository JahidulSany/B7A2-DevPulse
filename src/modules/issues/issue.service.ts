import { pool } from '../../db';
import type { IIssue } from './issue.interface';

const createIssueIntoDB = async (payload: IIssue) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `
    INSERT INTO issues (title, description, type)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [title, description, type],
  );

  return result.rows[0];
};

const getAllIssuesFromDB = async (payload: any) => {};

const getSignleIssueFromDB = async (payload: any) => {};

const updateIssueFromDB = async (payload: any) => {};

const deleteIssueFromDB = async (payload: any) => {};

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSignleIssueFromDB,
  updateIssueFromDB,
  deleteIssueFromDB,
};
