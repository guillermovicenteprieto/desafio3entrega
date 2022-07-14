import { Router } from "express";
import productController from "../controllers/productController.js";
const routeProduct = Router();

/*====================[Rutas API: /api/productos]====================*/
routeProduct.get("/productos", productController.getAllProducts);
routeProduct.post("/productos", productController.createProduct);
routeProduct.get("/productos/:id", productController.getProductById);
routeProduct.put("/productos/:id", productController.updateProduct);
routeProduct.delete("/productos/:id", productController.deleteProduct);

export default routeProduct;