import CartClass from "../class/classCart.js";
const cartClass = new CartClass();
import logger from "../utils/loggers.js";
import {Cart} from "../models/Cart.js";
import {Product} from "../models/Product.js";
import sendSMS from "../utils/messagesSMS.js";
import sendMail from "../utils/messagesMail.js";
import sendWhatsapp from "../utils/messagesWhatsapp.js";
import dotenv from "dotenv";
dotenv.config();

class CartController {
    // constructor () {
    //     this.cartClass = []
    // }
    async getAllCarts () {
        try {
            logger.info(`Se registra petición GET /carrito`)
            const carts = await cartClass.getAllCarts()
            logger.info(`Se obtienen carts`)
            return carts
        }
        catch (err) {
            logger.error(`Error al obtener carts`)
            throw err
        }
    }
    async createCart () {
        try {
            logger.info(`Se registra petición POST /carts`)
            const cartCreado = await cartClass.createCart()
            logger.info(`Se crea cart`)
            return cartCreado
        }
        catch (err) {
            logger.error(`Error al crear cart`)
            throw err
        }
    }
    async getCartById (id) {
        try {
            logger.info(`Se registra petición GET /carts/${id}`)
            const cart = await Cart.findById(id)
            logger.info(`Se obtiene cart`)
            return cart
        }
        catch (err) {
            logger.error(`Error al obtener cart`)
            throw err
        }
    }
    async updateCart (id, cart) {
        try {
            logger.info(`Se registra petición PUT /carts/${id}`)
            const cartActualizado = await Cart.findByIdAndUpdate(id, cart)
            logger.info(`Se actualiza cart`)
            return cartActualizado
        }
        catch (err) {
            logger.error(`Error al actualizar cart`)
            throw err
        }
    }
    async deleteCart (id) {
        try {
            logger.info(`Se registra petición DELETE /carts/${id}`)
            const cartEliminado = await Cart.findByIdAndDelete(id)
            logger.info(`Se elimina cart`)
            return cartEliminado
        }
        catch (err) {
            logger.error(`Error al eliminar cart`)
            throw err
        }
    }
    async addProductToCart (id, product) {
        try {
            logger.info(`Se registra petición POST /carts/${id}/products`)
            const cart = await Cart.findById(id)
            const producto = await Product.findById(product)
            cart.products.push(producto)
            const cartActualizado = await cart.save()
            logger.info(`Se agrega producto al cart`)
            return cartActualizado
        }
        catch (err) {
            logger.error(`Error al agregar producto al cart`)
            throw err
        }
    }
    async removeProductFromCart (id, product) {
        try {
            logger.info(`Se registra petición DELETE /carts/${id}/products/${product}`)
            const cart = await Cart.findById(id)
            const producto = await Product.findById(product)
            cart.products.pull(producto)
            const cartActualizado = await cart.save()
            logger.info(`Se elimina producto del cart`)
            return cartActualizado
        }
        catch (err) {
            logger.error(`Error al eliminar producto del cart`)
            throw err
        }
    }

    async getCartProducts (id) {
        try {
            logger.info(`Se registra petición GET /carts/${id}/products`)
            const cart = await Cart.findById(id)
            logger.info(`Se obtiene cart`)
            return cart.products
        }
        catch (err) {
            logger.error(`Error al obtener cart`)
            throw err
        }
    }

    async getBuyerCart (id) {
        try {
            const TEST_MAIL = process.env.TEST_MAIL;
            const USER_MAIL_PASS = process.env.USER_MAIL_PASS;

            const cartBuyer = await Cart.findById(id)

            const products = await Promise.all(cartBuyer.products.map(async product => {
                const producto = await Product.findById(product)
                return producto
            }
            ))
            const total = products.reduce((total, product) => total + product.price, 0)
            const cart = new CartClass(cartBuyer.id, cartBuyer.buyer, cartBuyer.products, total)
            return cart

        }
        catch (err) {
            logger.error(`Error al obtener cart`)
            throw err
        }
    }
    async sendSMS (id) {
        try {
            const cart = await this.getBuyerCart(id)
            const message = `Hola ${cart.buyer.name}, tu compra ha sido realizada con éxito. El total es de ${cart.total}`
            const phone = cart.buyer.phone
            sendSMS(message, phone)
            logger.info(`Se envía SMS`)
        }
        catch (err) {
            logger.error(`Error al enviar SMS`)
            throw err
        }
    }
    async sendMail (id) {
        try {
            const cart = await this.getBuyerCart(id)
            const message = `Hola ${cart.buyer.name}, tu compra ha sido realizada con éxito. El total es de ${cart.total}`
            const mail = cart.buyer.mail
            sendMail(message, mail)
            logger.info(`Se envía mail`)
        }
        catch (err) {
            logger.error(`Error al enviar mail`)
            throw err
        }
    }
    async sendWhatsapp (id) {
        try {
            const cart = await this.getBuyerCart(id)
            const message = `Hola ${cart.buyer.name}, tu compra ha sido realizada con éxito. El total es de ${cart.total}`
            const phone = cart.buyer.phone
            sendWhatsapp(message, phone)
            logger.info(`Se envía Whatsapp`)
        }
        catch (err) {
            logger.error(`Error al enviar Whatsapp`)
            throw err
        }
    }
}
export default CartController