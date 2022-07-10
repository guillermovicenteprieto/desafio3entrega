import { Router } from "express";
import ProductController from '../controllers/productController.js';
const productController = new ProductController();
// import logger from "../utils/loggers.js";
// import { Product } from "../models/Product.js";

export const routeProduct = Router();

/*====================[Rutas API: /api/productos]====================*/
routeProduct.get("/productos", productController.getAllProducts);
routeProduct.post("/productos", productController.createProduct);
routeProduct.get("/productos/:id", productController.getProductById);
routeProduct.put("/productos/:id", productController.updateProduct);
routeProduct.delete("/productos/:id", productController.deleteProduct);


export default routeProduct;