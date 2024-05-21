import { Router } from "express";
import { usersController } from "../controllers/usersController.js";

const router = new Router();

router.get('/users/', usersController.getAll);
router.post('/users/login', usersController.userLogin);
router.get('/users/:id', usersController.getUser);
router.post('/users/', usersController.createUser);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);


export default router;