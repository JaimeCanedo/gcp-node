import { usersModel } from "../models/usersModel.js";

const getAll = async (req,res) => {
    try {
        const response = await usersModel.findAll();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
};

const createUser = async (req, res) => {
    const { name, password, email, rol } = req.body;
    try {
        const newUser = await usersModel.createUser( name, password, email, rol);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const usersController = {
    getAll,
    createUser,
};