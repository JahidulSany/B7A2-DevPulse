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
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(30) NOT NULL,
        role VARCHAR(20) DEFAULT 'contributor' CHECK (role IN ('contributor', 'maintainer')),

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS issues(
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL, 
        description TEXT NOT NULL CHECK (char_length(description) >= 20),
        type TEXT CHECK (type IN ('bug', 'feature_request')), 
        status VARCHAR(15) DEFAULT 'open' CHECK (type IN ('open', 'in_progress', 'resolved')), 
        
        reporter_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )`);
    
    console.log(`Database connected successfully`);
  } catch (error) {
    console.error(error);
  }
};
