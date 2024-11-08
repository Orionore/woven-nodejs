import {Router} from 'express';
import {deleteUserById, getUserById, updateUserById} from "../controller/admin.controller.js";
import {createUserController} from "../controller/user.controller.js";

const router = Router();

// user
router.get('/user/:id', getUserById)
router.post('/user/:id', createUserController)
router.patch('/user/:id', updateUserById)
router.delete('/user/:id', deleteUserById)

export default router