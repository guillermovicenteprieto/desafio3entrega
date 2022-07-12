import dotenv from "dotenv";
dotenv.config();

import CartClass from "../class/classCart.js";
const cartClass = new CartClass();
import ProductsClass from "../class/classProducts.js";
const productsClass = new ProductsClass();

import logger from "../utils/loggers.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
// import { User } from "../models/User.js";
// import sendSMS from "../utils/messageSMS.js";
// import sendMail from "../utils/messageEmailEthereal.js";
// import sendWhatsapp from "../utils/messageWhatsApp.js";

class CartController {
    constructor() {
        this.cartClass = []
    }
    async getAllCarts(req, res) {
        try {
            logger.info(`Se registra petición GET /api/carritos`)
            const carts = await cartClass.getAllCarts()
            logger.info(`Se obtienen carts`)
            res.json(carts)
            return carts
        }
        catch (err) {
            logger.error(`Error al obtener carts`)
            throw err
        }
    }

    async getCartById(req, res) {
        try {
            logger.info(`Se registra petición GET /api/carritos/${req.params.id}`)
            const cart = await cartClass.getCartById(req.params.id)
            logger.info(`Se obtiene cart`)
            res.json(cart)
            return cart
        }
        catch (err) {
            logger.error(`Error al obtener cart`)
            throw err
        }
    }

    async getCartProducts(req, res) {
        try {
            logger.info(`Se registra petición GET /api/carritos/${req.params.id}/productos`)

            const cart = await cartClass.getCartById(req.params.id)
            const products = await Promise.all(cart.products.map(async product => {
                return await productsClass.getProductById(product)
            }
            ))
            logger.info(`Se obtienen productos`)
            res.json(products)
            return products
        }
        catch (err) {
            logger.error(`Error al obtener products`)
            throw err
        }
    }

    async createCart(req, res) {
        try {
            logger.info(`Se registra petición POST /api/carritos`)
            const carrito = await cartClass.createCart(req.body)

            logger.info(`Se crea cart`)
            res.json(carrito)
            return carrito
        }
        catch (err) {
            logger.error(`Error al crear cart`)
            throw err
        }
    }

    async addProductToCart(req, res) {
        try {
            logger.info(`Se registra petición POST /api/carritos/${req.params.id}/productos/${req.params.idProduct}`)
            const cart = await cartClass.addProductToCart(req.params.id, req.params.idProduct)
            logger.info(`Se agrega producto al carrito`)
            res.json(cart)
            return cart
        }
        catch (err) {
            logger.error(`Error al agregar producto al carrito`)
            throw err
        }
    }

    async removeProductFromCart(req, res) {
        try {
            logger.info(`Se registra petición DELETE /api/carritos/${req.params.id}/productos/${req.params.idProduct}`)
            const cart = await cartClass.removeProductFromCart(req.params.id, req.params.idProduct)
            logger.info(`Se elimina producto del cart`)
            res.json(cart)
            return cart
        } catch (err) {
            logger.error(`Error al eliminar producto del cart`)
            throw err
        }
    }

    async deleteCart(req, res) {
        try {
            logger.info(`Se registra petición DELETE /api/carritos/${req.params.id}`)
            const cart = await cartClass.deleteCart(req.params.id)
            logger.info(`Se elimina cart`)
            res.json(cart)
            return cart
        }
        catch (err) {
            logger.error(`Error al eliminar cart`)
            throw err
        }
    }
    /*resolver!*/
    // async getBuyerCart(id) {
    //     try {
    //         const TEST_MAIL = process.env.TEST_MAIL;
    //         const USER_MAIL_PASS = process.env.USER_MAIL_PASS;
    //         const cartBuyer = await Cart.findById(id)
    //         const products = await Promise.all(cartBuyer.products.map(async product => {
    //             const producto = await Product.findById(product)
    //             return producto
    //         }
    //         ))
    //         const total = products.reduce((total, product) => total + product.price, 0)
    //         const cart = new CartClass(cartBuyer.id, cartBuyer.buyer, cartBuyer.products, total)
    //         return cart

    //     }
    //     catch (err) {
    //         logger.error(`Error al obtener cart`)
    //         throw err
    //     }
    // }

    // async sendSMS(id) {
    //     try {
    //         const cart = await this.getBuyerCart(id)
    //         const message = `Hola ${cart.buyer.name}, tu compra ha sido realizada con éxito. El total es de ${cart.total}`
    //         const phone = cart.buyer.phone
    //         sendSMS(message, phone)
    //         logger.info(`Se envía SMS`)
    //     }
    //     catch (err) {
    //         logger.error(`Error al enviar SMS`)
    //         throw err
    //     }
    // }

    // async sendMail(id) {
    //     try {
    //         const cart = await this.getBuyerCart(id)
    //         const message = `Hola ${cart.buyer.name}, tu compra ha sido realizada con éxito. El total es de ${cart.total}`
    //         const mail = cart.buyer.mail
    //         sendMail(message, mail)
    //         logger.info(`Se envía mail`)
    //     }
    //     catch (err) {
    //         logger.error(`Error al enviar mail`)
    //         throw err
    //     }
    // }

    // async sendWhatsapp(id) {
    //     try {
    //         const cart = await this.getBuyerCart(id)
    //         const message = `Hola ${cart.buyer.name}, tu compra ha sido realizada con éxito. El total es de ${cart.total}`
    //         const phone = cart.buyer.phone
    //         sendWhatsapp(message, phone)
    //         logger.info(`Se envía Whatsapp`)
    //     }
    //     catch (err) {
    //         logger.error(`Error al enviar Whatsapp`)
    //         throw err
    //     }
    // }
}

export default CartController