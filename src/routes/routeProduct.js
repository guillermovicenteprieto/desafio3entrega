import { Router } from "express";
import ProductController from '../controllers/productController.js';
const productController = new ProductController();

/* del código anterior, para resolver en routeCart*/
// import logger from "../utils/loggers.js";
// import { Product } from "../models/Product.js";
// import generateRandomProduct from "../class/fakerContainer.js";
// const listProducts = generateRandomProduct(10);

export const routeProduct = Router();

/*============================[Rutas API: /api/productos]============================*/
routeProduct.get("/productos", productController.getAllProducts);
routeProduct.post("/productos", productController.createProduct);
routeProduct.get("/productos/:id", productController.getProductById);
routeProduct.put("/productos/:id", productController.updateProduct);
routeProduct.delete("/productos/:id", productController.deleteProduct);

/* código anterior para resolver misma metodología ccon routeCart */
/*
routeProduct
  .get('/productos', (req, res) => {
    logger.info(`Se registra petición GET /productos`)
    Product.find({}, (err, productos) => {
      if (err) {
        logger.error(`Error al obtener productos`)
        res.json(err);
      } else {
        logger.info(`Se obtienen los productos`)
        res.json(productos);
      }
    })
  })

  .get('/productos/:id', (req, res) => {
    logger.info(`Se registra petición GET /productos/${req.params.id}`)
    Product.findById(req.params.id, (err, producto) => {
      if (err) {
        logger.error(`Error al obtener producto`)
        res.json(err);
      } else {
        logger.info(`Se obtiene producto`)
        res.json(producto);
      }
    })
  })

  .post('/productos', (req, res) => {
    logger.info(`Se registra petición POST /productos`)
    const producto = {
      id: listProducts.length + 1,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      url: req.body.url
    }
    Product.create(producto, (err, producto) => {
      if (err) {
        logger.error(`Error al crear producto`)
        res.json(err);
      } else {
        logger.info(`Se crea producto`)
        res.json(producto);
      }
    })
  })

  .put('/productos/:id', (req, res) => {
    logger.info(`Se registra petición PUT /productos/${req.params.id}`)
    Product.findById(req.params.id, (err, producto) => {
      if (err) {
        logger.error(`Error al obtener producto`)
        res.json(err);
      } else {
        producto.name = req.body.name;
        producto.price = req.body.price;
        producto.description = req.body.description;
        producto.url = req.body.url;
        producto.save(producto, (err, producto) => {
          if (err) {
            logger.error(`Error al actualizar producto`)
            res.json(err);
          } else {
            logger.info(`Se actualiza producto`)
            res.json(producto);
          }
        })
      }
    })
  })

  .delete('/productos/:id', (req, res) => {
    logger.info(`Se registra petición DELETE /productos/${req.params.id}`)
    Product.findById(req.params.id, (err, producto) => {
      if (err) {
        logger.error(`Error al obtener producto`)
        res.json(err);
      } else {
        producto.remove(producto, (err, producto) => {
          if (err) {
            logger.error(`Error al eliminar producto`)
            res.json(err);
          } else {
            logger.info(`Se elimina producto`)
            res.json(producto);
          }
        })
      }
    })
  })
*/
export default routeProduct;