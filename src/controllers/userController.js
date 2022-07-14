import logger from '../utils/loggers.js';
import userDao from "../daos/userDao.js";

class userController {
    constructor() {
        this.userDao = [];
    }

    async getAllUsers(req, res) {
        try {
            logger.info(`Se registra petición GET /api/users`);
            const users = await userDao.getAllUsers();
            logger.info(`Se obtienen users`);
            res.json({users});
        }
        catch (err) {
            logger.error(`Error al obtener users`);
            throw err;
        }
    }

    async getUserById(req, res) {
        try {
            logger.info(`Se registra petición GET /api/users/${req.params.id}`);
            const user = await userDao.getUserById(req.params.id);
            logger.info(`Se obtiene user`);
            res.json({user});
        }
        catch (err) {
            logger.error(`Error al obtener user`);
            throw err;
        }
    }

    async createUser(req, res) {
        try {
            logger.info(`Se registra petición POST /api/users`);
            const userCreado = await userDao.createUser(req.body);
            logger.info(`Se crea user`);
            res.json({userCreado});
        }
        catch (err) {
            logger.error(`Error al crear user`);
            throw err;
        }
    }

    async updateUser(req, res) {
        try {
            logger.info(`Se registra petición PUT /api/users/${req.params.id}`);
            const userActualizado = await userDao.updateUser(req.params.id, req.body);
            logger.info(`Se actualiza user`);
            res.json({userActualizado});
        }
        catch (err) {
            logger.error(`Error al actualizar user`);
            throw err;
        }
    }

    async deleteUser(req, res) {
        try {
            logger.info(`Se registra petición DELETE /api/users/${req.params.id}`);
            const userEliminado = await userDao.deleteUser(req.params.id);
            logger.info(`Se elimina user`);
            res.json({userEliminado});
        }
        catch (err) {
            logger.error(`Error al eliminar user`);
            throw err;
        }
    }
 
}

export default new userController();

