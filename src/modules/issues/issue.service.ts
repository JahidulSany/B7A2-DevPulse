import { pool } from '../../db';
import type { IIssue, IQueryParams } from './issue.interface';

const createIssueIntoDB = async (payload: IIssue, id: string) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `
    INSERT INTO issues (title, description, type, reporter_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [title, description, type, id],
  );

  return result;
};

const getAllIssuesFromDB = async (payload: IQueryParams) => {
  const { sort, type, status } = payload;
  const querySelectAll = `SELECT * FROM issues`;
  let result;

  if (type && status) {
    result = await pool.query(
      `${querySelectAll} WHERE type = $1 AND status = $2`,
      [type, status],
    );
  } else if (type) {
    result = await pool.query(`${querySelectAll} WHERE type = $1`, [type]);
  } else if (status) {
    result = await pool.query(`${querySelectAll} WHERE status = $1`, [status]);
  } else {
    result = await pool.query(querySelectAll);
  }

  if (sort === 'oldest') {
    result = await pool.query(`${querySelectAll} ORDER BY created_at ASC`);
  } else {
    result = await pool.query(`${querySelectAll} ORDER BY created_at DESC`);
  }

  let issues = result.rows;

  const filteredIssues = [];

  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i];

    const userResult = await pool.query(
      `SELECT id, name, role FROM users WHERE id = $1`,
      [issue.reporter_id],
    );

    console.log(userResult);

    const reporterData = userResult.rows.length > 0 ? userResult.rows[0] : null;

    const formattedIssue = {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: reporterData,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };

    filteredIssues.push(formattedIssue);
  }

  return filteredIssues;
};

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
