import { pool } from "../database/connection.js";

const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM users ORDER BY id ASC");
    return rows;
};

const createUser = async (name, password, email, rol ) => {
    try {
        const query = 'INSERT INTO users (name, password, email, rol) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, password, email, rol];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const usersModel = {
    findAll,
    createUser, 
};