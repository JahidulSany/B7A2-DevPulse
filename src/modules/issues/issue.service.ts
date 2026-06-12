import { pool } from '../../db';
import type { TUserRole } from '../../types';
import type { IIssue, IQueryParams } from './issue.interface';

const createIssueIntoDB = async (payload: IIssue, id: string) => {
  const { title, description, type, status } = payload;

  const result = await pool.query(
    `
    INSERT INTO issues (title, description, type, status, reporter_id)
    VALUES ($1, $2, $3, COALESCE($4, 'open') , $5)
    RETURNING *;
    `,
    [title, description, type, status, id],
  );

  return result;
};

const getAllIssuesFromDB = async (payload: IQueryParams) => {
  const { sort, type, status } = payload;
  const querySelectAll = `SELECT * FROM issues`;

  const sortingOrder =
    sort === 'oldest' ? 'ORDER BY created_at ASC' : 'ORDER BY created_at DESC';

  let result;

  if (type && status) {
    result = await pool.query(
      `${querySelectAll} WHERE type = $1 AND status = $2 ${sortingOrder}`,
      [type, status],
    );
  } else if (type) {
    result = await pool.query(
      `${querySelectAll} WHERE type = $1 ${sortingOrder}`,
      [type],
    );
  } else if (status) {
    result = await pool.query(
      `${querySelectAll} WHERE status = $1 ${sortingOrder}`,
      [status],
    );
  } else {
    result = await pool.query(`${querySelectAll} ${sortingOrder}`);
  }

  let issues = result.rows;

  const filteredIssues = [];

  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i];

    const userResult = await pool.query(
      `SELECT id, name, role FROM users WHERE id = $1`,
      [issue.reporter_id],
    );

    // console.log(userResult);

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

const getSingleIssueFromDB = async (id: string) => {
  const result = await pool.query(`SELECT * FROM issues WHERE id = $1`, [id]);

  const issue = result.rows[0];

  const filteredIssues = [];

  const userResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = $1`,
    [issue.reporter_id],
  );

  // console.log(userResult);

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
  return filteredIssues;
};

const updateIssueFromDB = async (
  payload: IIssue,
  id: string,
  userId: string,
  userRole: TUserRole,
) => {
  const { title, description, type } = payload;

  const issueData = await pool.query(`SELECT * FROM issues WHERE id = $1`, [
    id,
  ]);

  if (issueData.rows.length === 0) {
    throw new Error('Issue not found');
  }

  const issue = issueData.rows[0];

  if (userRole === 'maintainer') {
  } else if (userRole === 'contributor') {
    if (String(issue.reporter_id) !== String(userId)) {
      throw new Error("Forbidden. You cannot update someone else's issue.");
    }

    if (issue.status !== 'open') {
      throw new Error('Forbidden. Contributors can only update open issues.');
    }
  } else {
    throw new Error('Unauthorized role access.');
  }

  const updated_time = new Date().toISOString();

  const result = await pool.query(
    `
    UPDATE issues
    SET title = COALESCE($1, title), description = COALESCE($2, description), type = COALESCE($3, type), updated_at = $4 WHERE id = $5 RETURNING *
  `,
    [title, description, type, updated_time, id],
  );

  return result;
};

const deleteIssueFromDB = async (userRole: TUserRole, id: string) => {
  if (userRole === 'maintainer') {
  } else {
    throw new Error('Unauthorized Role Access');
  }
  
  const result = await pool.query(
    `
      DELETE FROM issues WHERE id = $1 RETURNING *
    `,
    [id],
  );

  if (!result.rows[0]) {
    throw new Error('Issue is not found or deleted already');
  }

  return result.rows[0];
};

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueFromDB,
  deleteIssueFromDB,
};
