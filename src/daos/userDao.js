import logger from "../utils/loggers.js";
import userClass from "../class/classUser.js";

class userDao {
    constructor() {
        this.listUsers = [];
    }

    async getAllUsers() {
        try {
            logger.info(`Se registra petición GET /api/users`);
            const users = await userClass.getAllUsers();
            logger.info(`Se obtienen users`);
            return users;
        }
        catch (err) {
            logger.error(`Error al obtener users`);
            throw err;
        }
    }
    async getUserById(id) {
        try {
            logger.info(`Se registra petición GET /api/users/${id}`);
            const user = await userClass.getUserById(id);
            logger.info(`Se obtiene user`);
            return user;
        }
        catch (err) {
            logger.error(`Error al obtener user`);
            throw err;
        }
    }
    async createUser(user) {
        try {
            logger.info(`Se registra petición POST /api/users`);
            const userCreado = await userClass.createUser(user);
            logger.info(`Se crea user`);
            return userCreado;
        }
        catch (err) {
            logger.error(`Error al crear user`);
            throw err;
        }
    }
    async updateUser(id, user) {
        try {
            logger.info(`Se registra petición PUT /api/users/${id}`);
            const userActualizado = await userClass.updateUser(id, user);
            logger.info(`Se actualiza user`);
            return userActualizado;
        }
        catch (err) {
            logger.error(`Error al actualizar user`);
            throw err;
        }
    }
    async deleteUser(id) {
        try {
            logger.info(`Se registra petición DELETE /api/users/${id}`);
            const userEliminado = await userClass.deleteUser(id);
            logger.info(`Se elimina user`);
            return userEliminado;
        }
        catch (err) {
            logger.error(`Error al eliminar user`);
            throw err;
        }
    }

    async getUserByEmail(email) {
        try {
            logger.info(`Se registra petición GET /api/users/email/${email}`);
            const user = await userClass.getUserByEmail(email);
            logger.info(`Se obtiene user`);
            return user;
        }
        catch (err) {
            logger.error(`Error al obtener user`);
            throw err;
        }
    }

    async getUserByUsername(username) {
        try {
            logger.info(`Se registra petición GET /api/users/username/${username}`);
            const user = await userClass.getUserByUsername(username);
            logger.info(`Se obtiene user`);
            return user;
        }
        catch (err) {
            logger.error(`Error al obtener user`);
            throw err;
        }
    }
}

export default new userDao();
