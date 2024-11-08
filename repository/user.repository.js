import pool from '../config/db.js';

export const createUser = async (name, mail, hashedPassword) => {
    const [result] = await pool.query(
        'INSERT INTO user (name, mail, password) VALUES (?, ?, ?)',
        [name, mail, hashedPassword]
    );
    return { id: result.insertId, name, mail, hashedPassword };
};

export const getUserById = async (id) => {
    const [rows] = await pool.query(
        'SELECT name, mail, password FROM user WHERE id = ?',
        [id]
    );
    return rows[0];
};

export const getUserByMail = async (mail) => {
    const [rows] = await pool.query(
        'SELECT id, name, mail, password FROM user WHERE mail = ?',
        [mail]
    );
    return rows[0];
};

export const updateUserById = async (id, name, mail, password) => {
    await pool.query(
        'UPDATE user SET name = ?, mail = ?, password = ? WHERE id = ?',
        [name, mail, password, id]
    );
    return { id, name, mail, password };
};

export const deleteUserById = async (id) => {
    await pool.query('DELETE FROM user WHERE id = ?', [id]);
    return { message: `user avec l'ID ${id} supprimé` };
};