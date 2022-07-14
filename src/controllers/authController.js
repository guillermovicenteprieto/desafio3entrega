import logger from "../utils/loggers.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import userController from "./userController.js";

class authController {
 

    async login(req, res) {
        try {
            logger.info(`Se registra petición GET /login`);
            const user = await userController.getUserById(req.params.id);
            logger.info(`Se obtiene user`);
            res.json({user});
        }
        catch (err) {
            logger.error(`Error al obtener user`);
            throw err;
        }
    }

    // async login (req, res) {
    //     try {
    //         logger.info(`Se registra petición POST /api/login`);
    //         const user = await userDao.getUserByUsername(req.body.username);
    //         logger.info(`Se obtiene user`);
    //         if (user) {
    //             if (user.password === req.body.password) {
    //                 logger.info(`Se autentica user`);
    //                 res.json({user});
    //             }
    //             else {
    //                 logger.info(`Se intenta autenticar user pero password incorrecto`);
    //                 res.status(401).json({message: "Password incorrecto"});
    //             }
    //         }
    //         else {
    //             logger.info(`Se intenta autenticar user pero no existe`);
    //             res.status(401).json({message: "Usuario no existe"});
    //         }
    //     }
    //     catch (err) {
    //         logger.error(`Error al autenticar user`);
    //         throw err;
    //     }
    // }

    // async register (req, res) {
    //     try {
    //         logger.info(`Se registra petición POST /api/register`);
    //         const user = await userDao.createUser(req.body);
    //         logger.info(`Se crea user`);
    //         res.json({user});
    //     }
    //     catch (err) {
    //         logger.error(`Error al crear user`);
    //         throw err;
    //     }
    // }

    // async logout (req, res) {
    //     try {
    //         logger.info(`Se registra petición POST /api/logout`);
    //         req.logout();
    //         logger.info(`Se cierra sesión`);
    //         res.json({message: "Sesión cerrada"});
    //     }
    //     catch (err) {
    //         logger.error(`Error al cerrar sesión`);
    //         throw err;
    //     }
    // }


}