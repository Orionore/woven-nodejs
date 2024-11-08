import pool from '../config/db.js';

export const createStory = async (userId, title, image, preface, genre) => {
    const [result] = await pool.query(
        'INSERT INTO story (user_id, title, image, preface, genre) VALUES (?, ?, ?, ?, ?)',
        [userId, title, image, preface, genre]
    );
    return { id: result.insertId, userId, title, image, preface, genre };
};

export const getStoryById = async (id) => {
    const [rows] = await pool.query(
        'SELECT title, image, preface, genre FROM story WHERE id = ?',
        [id]
    );
    return rows[0];
};

export const updateStoryById = async (id, title, image, preface, genre) => {
    await pool.query(
        'UPDATE story SET name = ?, mail = ?, password = ? WHERE id = ?',
        [title, image, preface, genre, id]
    );
    return { id, title, image, preface, genre };
};

export const deleteStoryById = async (id) => {
    await pool.query('DELETE FROM story WHERE id = ?', [id]);
    return { message: `story avec l'ID ${id} supprimé` };
};