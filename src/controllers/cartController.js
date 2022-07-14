import logger from "../utils/loggers.js";
import cartDao from "../daos/cartDao.js";
import productDao from "../daos/productDao.js";

/*===============[Datos necesarios para método buyCart]===============*/
import dotenv from "dotenv";
dotenv.config();
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import sendSMS from "../utils/messageSMS.js";
import sendMail from "../utils/messageEmailEthereal.js";
import sendWhatsapp from "../utils/messageWhatsApp.js";
const PHONE_TEST = process.env.PHONE
const TEST_MAIL_ETHEREAL='wyatt.luettgen92@ethereal.email'
const WSPHONE = process.env.WSPHONE


class cartController {
    constructor() {
        this.cartDao = [];
        this.productDao = [];
    }

    async getAllCarts(req, res) {
        try {
            logger.info(`Se registra petición GET /api/carritos`);
            const carritos = await cartDao.getAllCarts();
            logger.info(`Se obtienen carts`);
            res.json({ carritos });
        }
        catch (err) {
            logger.error(`Error al obtener carts`);
            throw err;
        }
    }

    async getCartById(req, res) {
        try {
            logger.info(`Se registra petición GET /api/carritos/${req.params.id}`);
            const carrito = await cartDao.getCartById(req.params.id);
            logger.info(`Se obtiene cart`);
            res.json({ carrito });
        }
        catch (err) {
            logger.error(`Error al obtener cart`);
            throw err;
        }
    }

    async getCartProducts(req, res) {
        try {
            logger.info(`Se registra petición GET 
            /api/carritos/${req.params.id}/productos`);
            const carrito = await cartDao.getCartById(req.params.id);
            const productos = await Promise.all(carrito.products.map(async product => {
                return await productDao.getProductById(product)
            }
            ));
            logger.info(`Se obtiene cart`);
            res.json({ carrito, productos });
        }
        catch (err) {
            logger.error(`Error al obtener cart`);
            throw err;
        }
    }

    async createCart(req, res) {
        try {
            logger.info(`Se registra petición POST /api/carritos`)
            const carrito = await cartDao.createCart(req.body)
            logger.info(`Se crea cart`)
            res.json({carritoCreado: carrito})
            return carrito
        }
        catch (err) {
            logger.error(`Error al crear cart`)
            throw err
        }
    }

    async addProductToCart(req, res) {
        try {
            logger.info(`Se registra petición POST 
            /api/carritos/${req.params.id}/productos/${req.params.idProduct}`)
            const cart = await cartDao.addProductToCart (req.params.id, req.params.idProduct)
            logger.info(`Se agrega producto al carrito`)
            res.json({  productoAgregado: cart })
            return cart
        }
        catch (err) {
            logger.error(`Error al agregar producto al carrito`)
            throw err
        }
    }

    async deleteCart(req, res) {
        try {
            logger.info(`Se registra petición DELETE /api/carritos/${req.params.id}`)
            const cart = await cartDao.deleteCart(req.params.id)
            logger.info(`Se elimina cart`)
            res.json({carritoEliminado: cart})
            return cart
        }
        catch (err) {
            logger.error(`Error al eliminar cart`)
            throw err
        }
    }

    async removeProductFromCart(req, res) {
        try {
            logger.info(`Se registra petición DELETE /api/carritos/${req.params.id}/productos/${req.params.idProduct}`)
            const cart = await cartDao.removeProductFromCart(req.params.id, req.params.idProduct)
            logger.info(`Se elimina producto del cart`)
            res.json(cart)
            return cart
        } catch (err) {
            logger.error(`Error al eliminar producto del cart`)
            throw err
        }
    }

    async buyCart(req, res) {
        try {
            const cart = await Cart.findById(req.params.id);
            const user = await User.findById(req.params.idUser);
            const products = await Product.find({ _id: { $in: cart.products } });
            const total = products.reduce((total, product) => total + product.price, 0);
            const message = `Hola ${user.username}, tu compra ha sido realizada con éxito. Ver detalle >`; 
            const detalle = `El total es de la compra es $ ${total}. Detalle de la compra: ${products.map(product => `${product.name} - ${product.price}`).join(', ')}`;
    
            //sendSMS(user.phone, message, detalle);
            //sendMail(user.email, message, detalle);
            //sendWhatsapp(WSPHONE, message, detalle);
    
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
    }

}

export default new cartController();