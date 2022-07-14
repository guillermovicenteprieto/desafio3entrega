import logger from "../utils/loggers.js";
import { User } from "../models/User.js";
class userClass {
  constructor() {
    this.listUsers = [];
  }

  async getAllUsers() {
    try {
      logger.info(`Se registra petición GET /users`);
      const users = await User.find({});
      logger.info(`Se obtienen users`);
      return users;
    } catch (err) {
      logger.error(`Error al obtener users`);
      throw err;
    }
  }

  async getUserById(id) {
    try {
      logger.info(`Se registra petición GET /users/${id}`);
      const user = await User.findById(id);
      logger.info(`Se obtiene user`);
      return user;
    } catch (err) {
      logger.error(`Error al obtener user`);
      throw err;
    }
  }

  async createUser(user) {
    try {
      logger.info(`Se registra petición POST /users`);
      const userCreado = await User.create(user);
      logger.info(`Se crea user`);
      return userCreado;
    } catch (err) {
      logger.error(`Error al crear user`);
      throw err;
    }
  }

  async updateUser(id, user) {
    try {
      logger.info(`Se registra petición PUT /users/${id}`);
      const userActualizado = await User.findByIdAndUpdate(id, user);
      logger.info(`Se actualiza user`);
      return userActualizado;
    } catch (err) {
      logger.error(`Error al actualizar user`);
      throw err;
    }
  }

  async deleteUser(id) {
    try {
      logger.info(`Se registra petición DELETE /users/${id}`);
      const userEliminado = await User.findByIdAndDelete(id);
      logger.info(`Se elimina user`);
      return userEliminado;
    } catch (err) {
      logger.error(`Error al eliminar user`);
      throw err;
    }
  }

  async getUserByEmail(email) {
    try {
      logger.info(`Se registra petición GET /users/email/${email}`);
      const user = await User.findOne({ email });
      logger.info(`Se obtiene user`);
      return user;
    } catch (err) {
      logger.error(`Error al obtener user`);
      throw err;
    }
  }

  async getUserByUsername(username) {
    try {
      logger.info(`Se registra petición GET /users/username/${username}`);
      const user = await User.findOne({ username });
      logger.info(`Se obtiene user`);
      return user;
    } catch (err) {
      logger.error(`Error al obtener user`);
      throw err;
    }
  }
}

export default new userClass();
