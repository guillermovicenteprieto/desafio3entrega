import mongoose from 'mongoose'
import logger from '../utils/loggers.js'
import { Product } from '../models/Product.js'
import generateRandomProduct from "./fakerContainer.js";
const listProducts = generateRandomProduct(10);

class ProductsClass {
  constructor () {
    this.listProducts = []
  }
  async getAllProducts () {
    try {
      logger.info(`Se registra petición GET /productos`)
      const productos = await Product.find({})
      logger.info(`Se obtienen productos`)
      return productos
    }
    catch (err) {
      logger.error(`Error al obtener productos`)
      throw err
    }
  }
  async createProduct (producto) {
    try {
      logger.info(`Se registra petición POST /productos`)
      //const lista = listProducts
      const productoCreado = await Product.create(producto)
      //productoCreado.push(lista)
      logger.info(`Se crea producto`)
      return productoCreado
    }
    catch (err) {
      logger.error(`Error al crear producto`)
      throw err
    }
  }
  async getProductById (id) {
    try {
      logger.info(`Se registra petición GET /productos/${id}`)
      const producto = await Product.findById(id)
      logger.info(`Se obtiene producto`)
      return producto
    }
    catch (err) {
      logger.error(`Error al obtener producto`)
      throw err
    }
  }
  async updateProduct (id, producto) {
    try {
      logger.info(`Se registra petición PUT /productos/${id}`)
      const productoActualizado = await Product.findByIdAndUpdate(id, producto)
      logger.info(`Se actualiza producto`)
      return productoActualizado
    }
    catch (err) {
      logger.error(`Error al actualizar producto`)
      throw err
    }
  }
  async deleteProduct (id) {
    try {
      logger.info(`Se registra petición DELETE /productos/${id}`)
      const productoEliminado = await Product.findByIdAndDelete(id)
      logger.info(`Se elimina producto`)
      return productoEliminado
    }
    catch (err) {
      logger.error(`Error al eliminar producto`)
      throw err
    }
  }

}

export default ProductsClass