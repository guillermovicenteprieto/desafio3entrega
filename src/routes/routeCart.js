import logger from "../utils/loggers.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { Router } from "express";

/*revisar por qué no funcionan la totalidad de éstas rutas con controllers:*/
// import CartController from "../controllers/cartController.js";
// const cartController = new CartController();
export const routeCart = Router();
// routeCart.get("/carritos", cartController.getAllCarts);
// routeCart.get("/carrito/:id", cartController.getCartById);
// routeCart.get("/carrito/:id/productos", cartController.getCartByIdProducts);
// routeCart.post("/carrito", cartController.createCart);
// routeCart.post("carrito/:id/productos/:idProduct", cartController.addProductToCart);
// routeCart.delete("/carrito/:id", cartController.deleteCart);
// routeCart.delete("/carrito/:id/productos/:idProduct  ", cartController.deleteProductFromCart);



//export const routeCart = Router();
/*============================[Rutas API: /api/carrito]============================*/

routeCart
    .get('/carritos', (req, res) => {
        logger.info(`Se registra petición GET /carritos`)
        Cart.find({}, (err, carritos) => {
            if (err) {
                logger.error(`Error al obtener carritos`)
                res.json(err);
            } else {
                logger.info(`Se obtienen carritos`)
                res.json(carritos);
            }
        })
    })

    .get('/carrito/:id', (req, res) => {
        logger.info(`Se registra petición GET /carritos/${req.params.id}`)
        Cart.findById(req.params.id, (err, carrito) => {
            if (err) {
                logger.error(`Error al obtener carrito`)
                res.json(err);
            } else {
                logger.info(`Se obtiene carrito`)
                res.json(carrito);
            }
        })
    })


    .get('/carrito/:id/productos', (req, res) => {
        logger.info(`Se registra petición GET /carritos/${req.params.id}/productos`)
        Cart.findById(req.params.id, (err, carrito) => {
            if (err) {
                logger.error(`Error al obtener productos`)
                res.json(err);
            } else {
                Product.find({ _id: { $in: carrito.products } }, (err, productos) => {
                    if (err) {
                        logger.error(`Error al obtener productos`)
                        res.json(err);
                    } else {
                        logger.info(`Se obtienen productos`)
                        const cart = {
                            id: carrito.id,
                            name: carrito.name,
                            Date: carrito.Date,
                            user: carrito.user,
                            products: productos
                        }
                        res.json({ cart });
                    }
                })
            }
        })
    })

    .post('/carrito', (req, res) => {
        logger.info(`Se registra petición POST /carritos`)
        const carrito = {
            id: req.body.id,
            name: req.body.name,
            Date: req.body.Date,
            user: req.body.user,
            products: req.body.products
        }
        Cart.create(carrito, (err, carrito) => {
            if (err) {
                logger.error(`Error al crear carrito`)
                res.json(err);
            } else {
                logger.info(`Se crea carrito`)
                res.json(carrito);
            }
        })
    })

    .post('/carrito/:id/productos/:idProduct', (req, res) => {
        logger.info(`Se registra petición POST /carritos/${req.params.id}/productos`)
        Cart.findById(req.params.id, (err, carrito) => {
            if (err) {
                logger.error(`Error al obtener carrito`)
                res.json(err);
            } else {
                Product.findById(req.params.idProduct, (err, product) => {
                    if (err) {
                        logger.error(`Error al obtener producto`)
                        res.json(err);
                    } else {
                        carrito.products.push(product);
                        carrito.save((err, carrito) => {
                            if (err) {
                                logger.error(`Error al agregar producto al carrito`)
                                res.json(err);
                            } else {
                                logger.info(`Se agrega producto al carrito`)
                                const cart = {
                                    id: carrito.id,
                                    name: carrito.name,
                                    Date: carrito.Date,
                                    user: carrito.user,
                                    products: carrito.products
                                }
                                res.json({ cart, product });
                                //res.json(carrito);
                            }
                        })
                    }
                })
            }
        })
    })

    .delete('/carrito/:id', (req, res) => {
        logger.info(`Se registra petición DELETE /carritos/${req.params.id}`)
        Cart.findByIdAndDelete(req.params.id, (err, carrito) => {
            if (err) {
                logger.error(`Error al eliminar carrito`)
                res.json(err);
            } else {
                logger.info(`Se elimina carrito`)
                res.json(carrito);
            }
        })
    })

    .delete('/carrito/:id/productos/:idProduct', (req, res) => {
        logger.info(`Se registra petición DELETE /carritos/${req.params.id}/products/${req.params.idProduct}`)
        Cart.findById(req.params.id, (err, carrito) => {
            if (err) {
                logger.error(`Error al obtener carrito`)
                res.json(err);
            } else {
                Product.findByIdAndDelete(req.params.idProduct, (err, product) => {
                    if (err) {
                        logger.error(`Error al eliminar producto`)
                        res.json(err);
                    } else {
                        carrito.products.pull(product);
                        carrito.save((err, carrito) => {
                            if (err) {
                                logger.error(`Error al eliminar producto del carrito`)
                                res.json(err);
                            } else {
                                logger.info(`Se elimina producto del carrito`)
                                const cart = {
                                    id: carrito.id,
                                    name: carrito.name,
                                    Date: carrito.Date,
                                    user: carrito.user,
                                    products: carrito.products
                                }
                                res.json({ cart });
                                //res.json(carrito);
                            }
                        })
                    }
                })
            }
        })
    })

export default routeCart;