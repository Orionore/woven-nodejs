import {
    getUserById,
    updateUserById,
    deleteUserById
} from '../repository/user.repository.js';
import {createUserService} from "../service/user.service.js";
import bcrypt from "bcrypt";

export const createUserController = async (req, res) => {
    try {
        const { name, mail, password } = req.body;
        const { user, token } = await createUserService(name, mail, password);
        res.status(201).json({ user, token });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({message: "Cet email est déjà utilisé."});
        } else {
            return res.status(500).json({message: "Erreur lors de la création de l'utilisateur", error});
        }
    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getUserById(id);
        if (!user) {
            res.status(404).json({ message: 'User non trouvé' });
        } else {
            res.json(user);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération de l\'User', error });
    }
};

export const updateUserByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, mail, password } = req.body;

        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const user = await updateUserById(id, name, mail, hashedPassword);
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'User', error });
    }
};

export const deleteUserByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteUserById(id);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la suppression de l\'User', error });
    }
};