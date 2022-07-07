import logger from "../utils/loggers.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { Router } from "express";

/*revisar por qué no funcionan la totalidad de éstas rutas con controllers:*/
// import CartController from "../controllers/cartController.js";
// const cartController = new CartController();

// routeCart.get("/carrito", cartController.getAllCarts);
// routeCart.post("/carrito", cartController.createCart);
// routeCart.get("/carrito/:id", cartController.getCartById);
// routeCart.put("/carrito/:id", cartController.updateCart);
// routeCart.delete("/carrito/:id", cartController.deleteCart);

export const routeCart = Router();
/*============================[Rutas API: /api/carrito]============================*/
routeCart
    .get('/carrito', (req, res) => {
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

    .put('/carrito/:id', (req, res) => {
        logger.info(`Se registra petición PUT /carritos/${req.params.id}`)
        const carrito = {
            id: req.body.id,
            name: req.body.name,
            Date: req.body.Date,
            user: req.body.user,
            products: req.body.products
        }
        Cart.findByIdAndUpdate(req.params.id, carrito, (err, carrito) => {
            if (err) {
                logger.error(`Error al actualizar carrito`)
                res.json(err);
            } else {
                logger.info(`Se actualiza carrito`)
                res.json(carrito);
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
                        res.json(carrito.products);
                    }
                })
            }
        })
    })
    .post('/carrito/:id/productos', (req, res) => {
        logger.info(`Se registra petición POST /carritos/${req.params.id}/products`)
        const product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        }

        Cart.findByIdAndUpdate(req.params.id, { $push: { products: product } }, (err, carrito) => {
            if (err) {
                logger.error(`Error al agregar producto al carrito`)
                res.json(err);
            } else {
                logger.info(`Se agrega producto al carrito`)
                res.json(carrito);
            }
        })
    })


    .delete('/:id/productos/:idProduct', (req, res) => {
        logger.info(`Se registra petición DELETE /carritos/${req.params.id}/products/${req.params.idProduct}`)
        Cart.findByIdAndUpdate(req.params.id, { $pull: { products: { id: req.params.idProduct } } }, (err, carrito) => {
            if (err) {
                logger.error(`Error al eliminar producto del carrito`)
                res.json(err);
            } else {
                logger.info(`Se elimina producto del carrito`)
                res.json(carrito);
            }
        })
    })


export default routeCart;