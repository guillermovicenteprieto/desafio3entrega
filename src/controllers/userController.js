import logger from "../utils/loggers.js";
import allProducts from "../services/listProductsOnDB.js";
const listProductsOnDB = allProducts;
import sharp from "sharp";
import fs from "fs";

class userController {
  async getHome(req, res) {
    try {
      if (req.session.username) {
        const nombre = req.user.username;
        const email = req.user.email;
        logger.info(`Se registra petición GET / ${nombre} ${email}`);
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
      if (req.user.username) {
        const nombre = req.user.username;
        const email = req.user.email;
        const id = req.user._id;
        const imagen = req.user.image;
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
      res.render("ingreso", {
        listProductsOnDB,
        nombre: req.user.username,
        email: req.user.email,
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
      fs.writeFileSync(`avatar/users/${image.originalname}`, data);
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
}

export default new userController();
