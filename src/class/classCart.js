import logger from '../utils/loggers.js'
import { Cart } from '../models/Cart.js'
import { Product } from '../models/Product.js'

class CartClass {

    constructor() {
        this.listProducts = []
    }

    async getAllCarts() {
        try {
            logger.info(`Se registra petición GET /api/carritos`)
            const carts = await Cart.find({})
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
            const cart = await Cart.findById(id)
            logger.info(`Se obtiene cart`)
            return cart
        }
        catch (err) {
            logger.error(`Error al obtener cart`)
            throw err
        }
    }

    async getCartProducts(id) {
        try {
            logger.info(`Se registra petición GET /api/carritos/${id}/productos`)
            const cart = await Cart.findById(id)
            const products = await Promise.all(cart.products.map(async product => {
                return await Product.findById(product)
            }
            ))
            logger.info(`Se obtienen products`)
            return products
        }
        catch (err) {
            logger.error(`Error al obtener products`)
            throw err
        }
    }

    async createCart(cart) {
        try {
            logger.info(`Se registra petición POST /api/carritos`)
            const carrito = await Cart.create(cart)
            logger.info(`Se crea cart`)
            const carro = {
                id: carrito._id,
                products: carrito.products,
                name: carrito.name,
            }
            return carro
        }
        catch (err) {
            logger.error(`Error al crear cart`)
            throw err
        }
    }

    
    async addProductToCart(id, idProduct) {
        try {
            logger.info(`Se registra petición POST /api/carritos/${id}/productos/${idProduct}`)
            const cart = await Cart.findById(id)
            const product = await Product.findById(idProduct)
            cart.products.push(product)
            cart.save((err, carrito) => {
                if (err) {
                    logger.error(`Error al agregar producto al carrito`)
                    throw err
                } else {
                    logger.info(`Se agrega producto al carrito`)
                    return carrito
                }
            })
        } catch (err) {
            logger.error(`Error al agregar producto al carrito`)
            throw err
        }
    }

    
    async removeProductFromCart(id, idProduct) {
        try {
            logger.info(`Se registra petición DELETE /api/carritos/${id}/productos/${idProduct}`)
            const cart = await Cart.findById(id)
            const product = await Product.findById(idProduct)
            cart.products.pull(product)
            cart.save((err, carrito) => {
                if (err) {
                    logger.error(`Error al eliminar producto del carrito`)
                    throw err
                } else {
                    logger.info(`Se elimina producto del carrito`)
                    return carrito
                }
            })
        }
        catch (err) {
            logger.error(`Error al eliminar producto del carrito`)
            throw err
        }
    }

    async updateCart(id, cart) {
        try {
            logger.info(`Se registra petición PUT /api/carritos/${id}`)
            const carrito = await Cart.findByIdAndUpdate(id, cart, { new: true })
            logger.info(`Se actualiza cart`)
            return carrito
        }
        catch (err) {
            logger.error(`Error al actualizar cart`)
            throw err
        }
    }


    async deleteCart(id) {
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
}

export default CartClass