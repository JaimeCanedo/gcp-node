import { usersModel } from "../models/usersModel.js";

const getAll = async (req,res) => {
    try {
        const response = await usersModel.findAll();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
};

export const usersController = {
    getAll
};