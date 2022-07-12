
import dotenv from "dotenv";
dotenv.config();

import logger from "../utils/loggers.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import sendSMS from "../utils/messageSMS.js";
import sendMail from "../utils/messageEmailEthereal.js";
import sendWhatsapp from "../utils/messageWhatsApp.js";
const PHONE_TEST = process.env.PHONE
const TEST_MAIL_ETHEREAL='wyatt.luettgen92@ethereal.email'
const WSPHONE = process.env.WSPHONE
import { Router } from "express";

import CartController from "../controllers/cartController.js";
const cartController = new CartController();
export const routeCart = Router();

/*============================[Rutas API: /api/carritos]============================*/
routeCart.get("/carritos", cartController.getAllCarts);
routeCart.get("/carritos/:id", cartController.getCartById);
routeCart.get("/carritos/:id/productos", cartController.getCartProducts);
routeCart.post("/carritos", cartController.createCart);
routeCart.post("/carritos/:id/productos/:idProduct", cartController.addProductToCart);
routeCart.delete("/carritos/:id", cartController.deleteCart);
routeCart.delete("/carritos/:id/productos/:idProduct", cartController.removeProductFromCart);


routeCart.get('/carritos/compra/:id/user/:idUser', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        const user = await User.findById(req.params.idUser);
        const products = await Product.find({ _id: { $in: cart.products } });
        const total = products.reduce((total, product) => total + product.price, 0);
        const message = `Hola ${user.username}, tu compra ha sido realizada con éxito. Ver detalle >`; 
        const detalle = `El total es de la compra es $ ${total}. Detalle de la compra: ${products.map(product => `${product.name} - ${product.price}`).join(', ')}`;

        sendMail(TEST_MAIL_ETHEREAL, message, detalle);
        sendSMS(PHONE_TEST, message, detalle);
        sendWhatsapp(WSPHONE, message, detalle);

        res.json({
            message: 'Compra realizada con éxito',
            cart: cart,
            user: user,
            products: products,
            total: total
        });

    }
    catch (error) {
        res.status(500).json({ message: "Error al realizar la compra" });
    }
})

export default routeCart;