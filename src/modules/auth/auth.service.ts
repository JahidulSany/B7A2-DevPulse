import bcrypt from 'bcryptjs';
import { pool } from '../../db';
import type { IAuthUser, IUserLogin } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const createUserAuthIntoDB = async (payload: IAuthUser) => {
  const { name, email, password, role } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, COALESCE($4, 'contributor'))
      RETURNING *;
    `,
    [name, email, hashedPassword, role],
  );

  delete result.rows[0].password;
  return result;
};

const userLoginFromDB = async (payload: IUserLogin) => {
  // Checking If User Exists
  const { email, password } = payload;

  const userData = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (userData.rows.length === 0) {
    throw new Error('Invalid Credentials');
  }

  const user = userData.rows[0];

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (!matchedPassword) {
    throw new Error('Invalid Credentials');
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.secret_key as string, {
    expiresIn: '1d',
  });

  delete user.password;
  return { token, user };
};

export const authService = {
  createUserAuthIntoDB,
  userLoginFromDB,
};
