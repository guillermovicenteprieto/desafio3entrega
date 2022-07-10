import mongoose from 'mongoose'
import logger from '../utils/loggers.js'
import { Cart } from '../models/Cart.js'
import { Product } from '../models/Product.js'

class CartClass {

    constructor () {
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
            return carrito
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
            if (!cart) {
                logger.error(`Error al actualizar cart`)
                throw new Error('Cart not found')
            }
            const product = await Product.findById(idProduct)
            if (!product) {
                logger.error(`Error al actualizar cart`)
                throw new Error('Product not found')
            }
            cart.products.push(product)

            return
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
    // async addProductToCart(id, idProduct) {
    //     try {
    //         logger.info(`Se registra petición POST /carts/${id}/productos/${idProduct}`)
    //         const cart = await Cart.findById(id)
    //         const product = await Product.findById(idProduct)
    //         cart.products.push(product)
    //         logger.info(`Se actualiza cart`)
    //         res.json(cart)
    //         return cart
    //     }
    //     catch (err) {
    //         logger.error(`Error al actualizar cart`)
    //         throw err
    //     }
    // }
    async removeProductFromCart(id, product) {
        try {
            logger.info(`Se registra petición DELETE /carts/${id}/products/${product}`)
            const cart = await Cart.findById(id)
            const product = await Product.findById(product)
            cart.products.pull(product)
            const cartActualizado = await Cart.findByIdAndUpdate(id, cart)
            logger.info(`Se actualiza cart`)
            return cartActualizado
        }
        catch (err) {
            logger.error(`Error al actualizar cart`)
            throw err
        }
    }

}

export default CartClass