import logger from "../utils/loggers.js";
import userService from "../services/userService.js";
// import allProducts from "../services/listProductsOnDB.js";
// const listProductsOnDB = allProducts;
import allProducts from "../utils/listProductsOnDB.js";
const listProductsOnDB = allProducts;
import sharp from "sharp";
import fs from "fs";
let instance= null;

class userController {
  static getInstance() {
    if(!instance) {
        instance = new userController()
    }
    return instance
  }

  async getHome(req, res) {
    try {
      logger.info(`Se registra petición GET /`);
      if (req.user.username) {
        const user = await userService.getUserByUsername(req.user.username);
        const nombre = user.username;
        const email = user.email;
        logger.info(`Se registra petición GET / por ${nombre} ${email}`);
        res.render("ingreso", { listProductsOnDB, nombre, email });
      } else {
        logger.info(
          `Se registra petición GET / pero no esta autenticado, se redirige a /login`
        );
        res.redirect("/login");
      }
    } catch (error) {
      logger.error(error);
      res.json({ message: "Error ingresar" });
    }
  }

  async productos(req, res) {
    try {
      logger.info(`Se registra petición GET /productos`);
      if (req.user.username) {
        const user = await userService.getUserByUsername(req.user.username);
        const nombre = user.username;
        const email = user.email;
        const id = user._id;
        const imagen = fs.readFileSync(`avatar/users/${user.image}`);
        logger.info(`Se registra petición GET /productos por ${nombre}`);
        res.render("products", { listProductsOnDB, nombre, email, id, imagen });
      } else {
        logger.info(
          `Se registra petición GET /productos pero no esta autenticado, se redirige a /login`
        );
        res.redirect("/login");
      }
    } catch (error) {
      logger.error(error);
      res.json({ message: "Error al obtener los productos" });
    }
  }

  async login(req, res) {
    try {
      logger.info(`Se registra petición GET /login`);
      res.render("login");
    } catch (err) {
      logger.error(`Error al obtener user`);
      throw err;
    }
  }
  async loginPost(req, res) {
    try {
      logger.info(`Se registra petición POST /login`);
      const user = await userService.getUserByUsername(req.user.username);
      const nombre = user.username;
      const email = user.email;
      res.render("ingreso", {
        listProductsOnDB,
        nombre,
        email,
      });
    } catch (err) {
      logger.error(`Error al obtener user`);
      throw err;
    }
  }

  async registro(req, res) {
    try {
      logger.info(`Se registra petición GET /registro`);
      res.render("registro");
    } catch (err) {
      logger.error(`Error al obtener user`);
      throw err;
    }
  }

  async registroPost(req, res) {
    try {
      logger.info(`Se registra petición POST /registro`);
      const image = req.file;
      console.log(image);
      const processImage = sharp(image.buffer);
      const data = await processImage.resize(200, 200).toBuffer();
      //const user = { ...req.body, image: data };

      //fs.writeFileSync(`avatar/users/${image.originalname}`, data);
      fs.writeFileSync(`avatar/users/${req.user.image}`, data);
      // const user = { ...req.body, image: data };
      // const newUser = await userService.createUser(user);
      logger.info(`Se registra petición POST /registro`);
      res.redirect("/login");
    } catch (err) {
      logger.error(`Error al obtener user`);
      throw err;
    }
  }

  async loginError(req, res) {
    try {
      logger.info(`Se registra petición GET /login-error`);
      res.render("login-error");
    } catch (err) {
      logger.error(`Error al obtener user`);
      throw err;
    }
  }

  async registroError(req, res) {
    try {
      logger.info(`Se registra petición GET /registro-error`);
      res.render("registro-error");
    } catch (err) {
      logger.error(`Error al obtener user`);
      throw err;
    }
  }

  async logout(req, res) {
    try {
      logger.info(`Se registra petición GET /logout`);
      const nombre = req.user.username;
      req.session.destroy((err) => {
        if (!err) {
          logger.info(`Se registra petición GET /logout por ${nombre}`);
          res.render("logout", { nombre });
        } else {
          logger.error(`Error al cerrar sesión por ${nombre}`);
          res.json(err);
        }
      });
    } catch (error) {
      logger.error(error);
      res.json({ message: "Error al cerrar sesión" });
    }
  }

  async getAllUsers(req, res) {
    try {
      logger.info(`Se registra petición GET /users`);
      const users = await userService.getAllUsers();
      const usuarios = users.map((user) => {
        return {
          nombre: user.username,
          email: user.email,
          id: user._id,
        };
      });
      res.json({ usuarios });
    } catch (error) {
      logger.error(error);
      res.json({ message: "Error al obtener los usuarios" });
    }
  }

  async getUserById(req, res) {
    try {
      logger.info(`Se registra petición GET /users/${req.params.id}`);
      const user = await userService.getUserById(req.params.id);
      const usuario = {
        nombre: user.username,
        email: user.email,
        id: user._id,
      };
      res.json({ usuario });
    } catch (error) {
      logger.error(error);
      res.json({ message: "Error al obtener el usuario" });
    }
  }

  async getUserImage(req, res) {
    try {
      logger.info(`Se registra petición GET /users/${req.params.id}/image`);
      const user = await userService.getUserById(req.params.id);
      const image = fs.readFileSync(`avatar/users/${user.image}`);
      res.setHeader("Content-Type", "image/png");
      //const image = user.image;
      //res.json({image});
      res.send(image);
    } catch (error) {
      logger.error(error);
      res.json({ message: "Error al obtener la imagen" });
    }
  }
  async deleteUser(req, res) {
    try {
      logger.info(`Se registra petición DELETE /users/${req.params.id}`);
      const user = await userService.deleteUser(req.params.id);
      res.json({ message: "Usuario eliminado" });
    } catch (error) {
      logger.error(error);
      res.json({ message: "Error al eliminar el usuario" });
    }
  }
  async updateUser(req, res) {
    try {
      logger.info(`Se registra petición PUT /users/${req.params.id}`);
      const user = await userService.updateUser(req.params.id, req.body);
      res.json({ message: "Usuario actualizado" });
    } catch (error) {
      logger.error(error);
      res.json({ message: "Error al actualizar el usuario" });
    }
  }
  
}

export default new userController();
