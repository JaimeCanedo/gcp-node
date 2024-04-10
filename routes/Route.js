import { Router } from "express";
import { usersController } from "../controllers/usersController.js";

const router = new Router();

router.get('/users/', usersController.getAll);
router.post('/users/', usersController.createUser);


export default router;