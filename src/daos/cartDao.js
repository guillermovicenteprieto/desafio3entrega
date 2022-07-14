import logger from '../utils/loggers.js';
import cartClass from '../class/classCart.js';
import productClass from '../class/classProduct.js';

class cartDao {
    constructor() {
        this.cartDao = []
    }

    async getAllCarts() {
        try {
            logger.info(`Se registra petición GET /api/carritos`)
            const carts = await cartClass.getAllCarts()
            logger.info(`Se obtienen carts`)
            return carts
        }
        catch (err) {
            logger.error(`Error al obtener carts`)
            throw err
        }
    }

    async getCartById(id) {
        try {
            logger.info(`Se registra petición GET /api/carritos/${id}`)
            const cart = await cartClass.getCartById(id)
            logger.info(`Se obtiene cart`)
            return cart
        }
        catch (err) {
            logger.error(`Error al obtener cart`)
            throw err
        }
    }

    async createCart(cart) {
        try {
            logger.info(`Se registra petición POST /api/carritos`)
            const newCart = await cartClass.createCart(cart)
            logger.info(`Se crea cart`)
            return newCart
        }
        catch (err) {
            logger.error(`Error al crear cart`)
            throw err
        }
    }

    async addProductToCart(id, idProduct) {
        try {
            logger.info(`Se registra petición POST /api/carritos/${id}/productos`)
            const cart = await cartClass.addProductToCart(id, idProduct)
            logger.info(`Se agrega producto al carrito`)
            const carrito = await cartClass.getCartById(id)
            const producto = await productClass.getProductById(idProduct)
            logger.info(`Se obtiene producto`)
            return { producto, carrito }
        }
        catch (err) {
            logger.error(`Error al agregar producto al carrito`)
            throw err
        }
    }

    async deleteCart(id) {
        try {
            logger.info(`Se registra petición DELETE /api/carritos/${id}`)
            const cart = await cartClass.deleteCart(id)
            logger.info(`Se elimina cart`)
            return cart
        }
        catch (err) {
            logger.error(`Error al eliminar cart`)
            throw err
        }
    }

    async removeProductFromCart(id, idProduct) {
        try {
            logger.info(`Se registra petición DELETE /api/carritos/${id}/productos/${idProduct}`)
            const productoEliminado = await productClass.getProductById(idProduct)
            const carrito = await cartClass.getCartById(id)
            const cart = await cartClass.removeProductFromCart(id, idProduct)
            logger.info(`Se elimina producto del carrito`)
            return { productoEliminado, carrito, cart }
        }
        catch (err) {
            logger.error(`Error al eliminar producto del carrito`)
            throw err
        }
    }

    async buyCart(id) {
        try {
            logger.info(`Se registra petición POST /api/carritos/${id}/comprar`)
            const cart = await cartClass.buyCart(id)
            logger.info(`Se comprueba carrito`)
            return cart
        }
        catch (err) {
            logger.error(`Error al comprar carrito`)
            throw err
        }

    }
}
export default new cartDao();