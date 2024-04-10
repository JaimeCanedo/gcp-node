import { pool } from "../database/connection.js";

const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM users ORDER BY id ASC");
    return rows;
};


export const usersModel = {
    findAll, 
};