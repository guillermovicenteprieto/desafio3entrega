import dotenv from "dotenv";
dotenv.config();

import logger from "../utils/loggers.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import sendSMS from "../utils/messageSMS.js";
import sendMail from "../utils/messageEmailEthereal.js";
import sendWhatsapp from "../utils/messageWhatsApp.js";

import { Router } from "express";

import CartController from "../controllers/cartController.js";
const cartController = new CartController();
export const routeCart = Router();

/*============================[Rutas API: /api/carritos]============================*/
routeCart.get("/carritos", cartController.getAllCarts); 
routeCart.get("/carritos/:id", cartController.getCartById);
routeCart.get("/carritos/:id/productos", cartController.getCartProducts);//
routeCart.post("/carritos", cartController.createCart); //
routeCart.delete("/carritos/:id", cartController.deleteCart);//


/*rutas que no funcionan desde controllers...*/
routeCart.get('/carrito/comprar/:id/user/:idUser', async (req, res) => {
    try {
        logger.info(`Se registra petición GET /api/carrito/comprar/${req.params.id}/user/${req.params.idUser}`)
        const cart = await Cart.findById(req.params.id)
        const user = await User.findById(req.params.idUser)
        const products = await Promise.all(cart.products.map(async product => {
            return await Product.findById(product)
        }
        ))
        const total = products.reduce((total, product) => {
            return total + product.price
        }
        , 0)
        const message = `Hola ${user.name}, tu compra ha sido exitosa. El total es de ${total}`
        sendSMS(user.phone, message)
        sendMail(user.email, message)
        sendWhatsapp(user.phone, message)
        logger.info(`Se envía mensaje de texto, correo electrónico y whatsapp`)
        res.json(cart)
        return cart
    }
    catch (err) {
        logger.error(`Error al obtener cart`)
        throw err
    }

        
})

//routeCart.post("carritos/:id/productos/:idProduct", cartController.addProductToCart);
routeCart.post('/carritos/:id/productos/:idProduct', (req, res) => {
    logger.info(`Se registra petición POST /carritos/${req.params.id}/productos`)
    Cart.findById(req.params.id, (err, carrito) => {
        if (err) {
            logger.error(`Error al obtener carrito`)
            res.json(err);
        } else {
            Product.findById(req.params.idProduct, (err, product) => {
                if (err) {
                    logger.error(`Error al obtener producto`)
                    res.json(err);
                } else {
                    carrito.products.push(product);
                    carrito.save((err, carrito) => {
                        if (err) {
                            logger.error(`Error al agregar producto al carrito`)
                            res.json(err);
                        } else {
                            logger.info(`Se agrega producto al carrito`)
                            const cart = {
                                id: carrito.id,
                                name: carrito.name,
                                Date: carrito.Date,
                                user: carrito.user,
                                products: carrito.products
                            }
                            res.json({ cart, product });
                            return;
                        }
                    })
                }
            })
        }
    })
})

//routeCart.delete("/carritos/:id/productos/:idProduct  ", cartController.removeProductFromCart);
routeCart.delete('/carrito/:id/productos/:idProduct', (req, res) => {
    logger.info(`Se registra petición DELETE /carritos/${req.params.id}/products/${req.params.idProduct}`)
    Cart.findById(req.params.id, (err, carrito) => {
        if (err) {
            logger.error(`Error al obtener carrito`)
            res.json(err);
        } else {
            Product.findByIdAndDelete(req.params.idProduct, (err, product) => {
                if (err) {
                    logger.error(`Error al eliminar producto`)
                    res.json(err);
                } else {
                    carrito.products.pull(product);
                    carrito.save((err, carrito) => {
                        if (err) {
                            logger.error(`Error al eliminar producto del carrito`)
                            res.json(err);
                        } else {
                            logger.info(`Se elimina producto del carrito`)
                            const cart = {
                                id: carrito.id,
                                name: carrito.name,
                                Date: carrito.Date,
                                user: carrito.user,
                                products: carrito.products
                            }
                            res.json({ cart });
                            return
                        }
                    })
                }
            })
        }
    })
})

export default routeCart;