import {
    createStory,
    getStoryById,
    updateStoryById,
    deleteStoryById,
} from '../repository/story.repository.js';

export const createStoryController = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ message: "L'utilisateur doit être authentifié pour créer une histoire." });
        }

        const { title, image, preface, genre } = req.body;

        if (!title || !image || !preface || !genre) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        const story = await createStory(userId, title, image, preface, genre);
        res.status(201).json({ story});
    } catch (error) {
        {
            console.error("Erreur lors de la création de la story :", error);
            return res.status(500).json({message: "Erreur lors de la création de la story", error});
        }
    }
};

export const getStoryByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const story = await getStoryById(id);
        if (!story) {
            res.status(404).json({ message: 'Story non trouvé' });
        } else {
            res.json(story);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération de la story', error });
    }
};

export const updateStoryByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, image, preface, genre } = req.body;

        const story = await updateStoryById(id, title, image, preface, genre);
        res.json(story);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de la story', error });
    }
};

export const deleteStoryByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteStoryById(id);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la suppression de la Story', error });
    }
};