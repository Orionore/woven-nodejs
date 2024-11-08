import {Router} from 'express';
import {
    createStoryController,
    getStoryByIdController,
    updateStoryByIdController,
    deleteStoryByIdController,
} from '../controller/Story.controller.js';

const router = Router();

// Créer un Story
router.post('/', createStoryController);

// Obtenir un Story par ID
router.get('/:id', getStoryByIdController);

// Mettre à jour un Story par ID
router.put('/:id', updateStoryByIdController);

// Supprimer un Story par ID
router.delete('/:id', deleteStoryByIdController);

export default router