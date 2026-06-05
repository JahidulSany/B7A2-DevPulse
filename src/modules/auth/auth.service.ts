import { pool } from '../../db';
import type { IAuthUser } from './auth.interface';

const createUserAuthIntoDB = async (payload: IAuthUser) => {
  // Checking If User Exists

  const { name, email, password, role } = payload;

  const result = await pool.query(
    `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, COALESCE($4, 'contributor'))
      RETURNING *;
    `,
    [name, email, password, role],
  );

  delete result.rows[0].password;
  return result;
};

export const authService = {
  createUserAuthIntoDB,
};
