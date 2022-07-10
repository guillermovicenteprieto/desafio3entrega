import logger from "../utils/loggers.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { Router } from "express";

import CartController from "../controllers/cartController.js";
const cartController = new CartController();
export const routeCart = Router();

/*============================[Rutas API: /api/carritos]============================*/
routeCart.get("/carritos", cartController.getAllCarts);
routeCart.get("/carritos/:id", cartController.getCartById);
routeCart.get("/carritos/:id/productos", cartController.getCartProducts);
routeCart.post("/carritos", cartController.createCart);

/*rutas que no funcionan desde controllers...*/



 routeCart.get('/buyCart/:id/user/:id', async (req, res) => {
    try {
        logger.info(`Se registra petición GET /api/carritos/${req.params.id}/user/${req.params.id}`)
        Cart.findById(req.params.id, (err, cart) => {
            if (err) {
                logger.error(`Error al obtener cart`)
                throw err
            }
            else {
                cart.buy(req.params.id, (err, cart) => {
                    if (err) {
                        logger.error(`Error al comprar cart`)
                        throw err
                    }
                    else {
                        logger.info(`Se compró cart`)
                        res.json(cart)
                        return cart
                    }
                }

                )
            }
        }


)
    }
    catch (err) {
        logger.error(`Error al comprar cart`)
        throw err
    }
}
)


//routeCart.post("carritos/:id/productos/:idProduct", cartController.addProductToCart);
routeCart.post('/carritos/:id/productos/:idProduct', (req, res) => {
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
                            return;
                        }
                    })
                }
            })
        }
    })
})

//routeCart.delete("/carritos/:id", cartController.deleteCart);
routeCart.delete("/carritos/:id", (req, res) => {
    logger.info(`Se registra petición DELETE /carritos/${req.params.id}`)
    Cart.findByIdAndDelete(req.params.id, (err, carrito) => {
        if (err) {
            logger.error(`Error al eliminar carrito`)
            res.json(err);
        } else {
            logger.info(`Se elimina carrito`)
            res.json(carrito);
            return
        }
    })
})

//routeCart.delete("/carritos/:id/productos/:idProduct  ", cartController.removeProductFromCart);
routeCart.delete('/carrito/:id/productos/:idProduct', (req, res) => {
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
                                return
                            }
                        })
                    }
                })
            }
        })
    })

export default routeCart;