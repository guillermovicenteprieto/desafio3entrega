import { Router } from "express";
import productController from "../controllers/productController.js";
import {isAuth} from "../middlewares/isAuth.js";
const routeProduct = Router();

/*====================[Rutas API: /api/productos]====================*/
routeProduct.get("/productos", productController.getAllProducts);
routeProduct.get("/productos/:id", productController.getProductById);
routeProduct.post("/productos", isAuth, productController.createProduct);
routeProduct.put("/productos/:id", isAuth, productController.updateProduct);
routeProduct.delete("/productos/:id", isAuth, productController.deleteProduct);

export default routeProduct;