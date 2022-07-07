import mongoose from 'mongoose'
import logger from '../utils/loggers.js'
import { Cart } from '../models/Cart.js'
import { Product } from '../models/Product.js'

class CartClass {
    async getAllCarts() {
        try {
            logger.info(`Se registra petición GET /carts`)
            const carts = await Cart.find({})
            logger.info(`Se obtienen carts`)
            return carts
        }
        catch (err) {
            logger.error(`Error al obtener carts`)
            throw err
        }
    }
    async createCart() {
        try {
            logger.info(`Se registra petición POST /carts`)
            const cartCreado = await Cart.create()
            logger.info(`Se crea cart`)
            return cartCreado
        }
        catch (err) {
            logger.error(`Error al crear cart`)
            throw err
        }
    }
    async getCartById(id) {
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
    async updateCart(id, cart) {
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
    async addProductToCart(id, product) {
        try {
            logger.info(`Se registra petición POST /carts/${id}/products`)
            const cart = await Cart.findById(id)
            cart.products.push(product)
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