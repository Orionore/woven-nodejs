import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByMail } from '../repository/user.repository.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

router.post('/auth/login', async (req, res) => {
    const { mail, password } = req.body;

    try {
        const user = await getUserByMail(mail);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        const token = jwt.sign(
            { id: user.id, mail: user.mail },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log("Token généré :", token);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la connexion", error });
    }
});

export default router;
