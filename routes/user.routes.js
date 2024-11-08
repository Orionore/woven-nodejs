import {Router} from 'express';
import {
    createUserController,
    getUserByIdController,
    updateUserByIdController,
    deleteUserByIdController,
} from '../controller/user.controller.js';
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

// Créer un User
router.post('/', createUserController);

// Obtenir un User par ID
router.get('/:id', getUserByIdController);

// Mettre à jour un User par ID
router.put('/:id', updateUserByIdController);

// Supprimer un User par ID
router.delete('/:id', deleteUserByIdController);

// User profile
router.get('/profile/:id', authenticateToken, (req, res) => {
    const userId = parseInt(req.params.id, 10);

    console.log("ID JWT:", req.user.id);
    console.log("ID URL:", userId);

    if (req.user.id !== userId) {
        return res.status(403).json({ message: "Accès interdit à ce profil" });
    }

    res.json({
        message: 'Bienvenue dans votre profil sécurisé',
        user: req.user,
    });
});

export default router