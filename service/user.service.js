import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { createUser } from '../repository/user.repository.js';

const JWT_SECRET = crypto.randomBytes(64).toString('hex');

export const createUserService = async (name, mail, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(name, mail, hashedPassword);

    const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { user: newUser, token };
};