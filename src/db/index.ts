import { Pool } from 'pg';
import config from '../config';

export const pool = new Pool({
  connectionString: config.connection_string,
});

export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) DEFAULT 'contributor' CHECK (role IN ('contributor', 'maintainer')),

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS issues(
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL, 
        description TEXT NOT NULL CHECK (char_length(description) >= 20),
        type TEXT CHECK (type IN ('bug', 'feature_request')), 
        status VARCHAR(20) DEFAULT 'open' CHECK (type IN ('open', 'in_progress', 'resolved')), 
        
        reporter_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )`);
    
    console.log(`Database connected successfully`);
  } catch (error) {
    console.error(error);
  }
};
