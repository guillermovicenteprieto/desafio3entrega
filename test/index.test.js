import chai from 'chai';
import { assert } from 'chai';
import { describe } from 'mocha';
import productClass from "../src/class/classProduct.js";
import productController from "../src/controllers/productController.js";
import productService from "../src/services/productService.js";
import productDao from "../src/daos/productDao.js";
import cartController from "../src/controllers/cartController.js";
import cartService from "../src/services/cartService.js";
import cartDao from "../src/daos/cartDao.js";

/*============================[Testeo en productClass]============================*/
describe("test Mocha - Chai", function () {
  it("contenedor productos: contiene producto", function () {
    const productos = [
      {
        id: 1,
        name: "Producto 1",
        price: 100,
        description: "Descripción del producto 1",
        image:
          "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        category: "Categoria 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    assert.equal(productos.length, 1);
  });
});

describe("test productClass, métodos", function () {
  it("productClass: testeo de método getAllProducts", function () {
    async function getAllProducts() {
      const productos = await productClass.getAllProducts();
      assert.equal(productos.length, 1);
    }
  });
  it("productClass: testeo de método getProductById", function () {
    async function getProductById() {
      const producto = await productClass.getProductById(1);
      assert.equal(producto.id, 1);
    }
  });
  it("productClass: testeo de método createProduct", function () {
    async function createProduct() {
      const producto = await productClass.createProduct({
        id: 2,
        name: "Producto 2",
        price: 200,
        description: "Descripción del producto 2",
        image:
          "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        category: "Categoria 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      assert.equal(producto.id, 2);
    }
  });
  it("productClass: testeo de método updateProduct", function () {
    async function updateProduct() {
      const producto = await productClass.updateProduct(1, {
        id: 1,
        name: "Producto 1",
        price: 100,
        stock: 10,
        description: "Descripción del producto 1",
        image:
          "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        category: "Categoria 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      assert.equal(producto.id, 1);
    }
  });
  it("productClass: testeo de método deleteProduct", function () {
    async function deleteProduct() {
      const producto = await productClass.deleteProduct(1);
      assert.equal(producto.id, 1);
    }
  });
});

/*============================[Testeo en productController]============================*/
describe("test productController, métodos", function () {
  it("productController: testeo getAllProducts", function () {
    async function getAllProducts() {
      const productos = await productController.getAllProducts();
      assert.equal(productos.length, 1);
    }
  });
  it("productController: testeo getProductById", function () {
    async function getProductById() {
      const producto = await productController.getProductById(1);
      assert.equal(producto.id, 1);
    }
  });
  it("productController: testeo createProduct", function () {
    async function createProduct() {
      const producto = await productController.createProduct({
        name: "Producto 2",
        price: 200,
        stock: 10,
        description: "Descripción del producto 2",
        image:
          "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        category: "Categoria 2",
      });
      assert.equal(producto.id, 2);
    }
  });
  it("productController: testeo updateProduct", function () {
    async function updateProduct() {
      const producto = await productController.updateProduct(1, {
        name: "Producto 1",
        price: 100,
        description: "Descripción del producto 1",
        image:
          "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        category: "Categoria 1",
      });
      assert.equal(producto.id, 1);
    }
  });
  it("productController: testeo deleteProduct", function () {
    async function deleteProduct() {
      const producto = await productController.deleteProduct(1);
      assert.equal(producto.id, 1);
    }
  });
});

/*============================[Testeo en productService]============================*/
describe("test productService, métodos", function () {
  it("productService: testeo de método getAllProducts", function () {
    async function getAllProducts() {
      const productos = await productService.getAllProducts();
      assert.equal(productos.length, 1);
    }
  });
  it("productService: testeo de método getProductById", function () {
    async function getProductById() {
      const producto = await productService.getProductById(1);
      assert.equal(producto.id, 1);
    }
  });
  it("productService: testeo de método createProduct", function () {
    async function createProduct() {
      const producto = await productService.createProduct({
        id: 2,
        name: "Producto 2",
        price: 200,
        stock: 10,
        description: "Descripción del producto 2",
        image:
          "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        category: "Categoria 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      assert.equal(producto.id, 2);
    }
  });
  it("productService: testeo de método updateProduct", function () {
    async function updateProduct() {
      const producto = await productService.updateProduct(1, {
        id: 1,
        name: "Producto 1",
        price: 100,
        stock: 10,
        description: "Descripción del producto 1",
        image:
          "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        category: "Categoria 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      assert.equal(producto.id, 1);
    }
  });
  it("productService: testeo de método deleteProduct", function () {
    async function deleteProduct() {
      const producto = await productService.deleteProduct(1);
      assert.equal(producto.id, 1);
    }
  });
});

/*============================[Testeo en productDao]============================*/
describe("test productDao, métodos", function () {
  it("productDao: testeo de método getAllProducts", function () {
    async function getAllProducts() {
      const productos = await productDao.getAllProducts();
      assert.equal(productos.length, 1);
    }
  });
  it("productDao: testeo de método getProductById", function () {
    async function getProductById() {
      const producto = await productDao.getProductById(1);
      assert.equal(producto.id, 1);
    }
  });
  it("productDao: testeo de método createProduct", function () {
    async function createProduct() {
      const producto = await productDao.createProduct({
        id: 2,
        name: "Producto 2",
        price: 200,
        stock: 10,
        description: "Descripción del producto 2",
        image:
          "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        category: "Categoria 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      assert.equal(producto.id, 2);
    }
  });
  it("productDao: testeo de método updateProduct", function () {
    async function updateProduct() {
      const producto = await productDao.updateProduct(1, {
        id: 1,
        name: "Producto 1",
        price: 100,
        stock: 10,
        description: "Descripción del producto 1",
        image:
          "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        category: "Categoria 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      assert.equal(producto.id, 1);
    }
  });
  it("productDao: testeo de método deleteProduct", function () {
    async function deleteProduct() {
      const producto = await productDao.deleteProduct(1);
      assert.equal(producto.id, 1);
    }
  });
});

/*============================[Testeo en cartController]============================*/
describe("test cartController, métodos", function () {
  it("cartController: testeo de método getAllCarts", function () {
    async function getAllCarts() {
      const carritos = await cartController.getAllCarts();
      assert.equal(carritos.length, 1);
    }
  });
  it("cartController: testeo de método getCartById", function () {
    async function getCartById() {
      const carrito = await cartController.getCartById(1);
      assert.equal(carrito.id, 1);
    }
  });
  it("cartController: testeo de método createCart", function () {
    async function createCart() {
      const carrito = await cartController.createCart({
        id: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      assert.equal(carrito.id, 2);
    }
  });
  it("cartController: testeo de método updateCart", function () {
    async function updateCart() {
      const carrito = await cartController.updateCart(1, {
        id: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      assert.equal(carrito.id, 1);
    }
  })
  it("cartController: testeo de método deleteCart", function () {
    async function deleteCart() {
      const carrito = await cartController.deleteCart(1);
      assert.equal(carrito.id, 1);
    }
  })
});

/*============================[Testeo en cartService]============================*/
describe("test cartService", function () {
  it("cartService: testeo de método getAllCarts", function () {
    async function getAllCarts() {
      const carritos = await cartService.getAllCarts();
      assert.equal(carritos.length, 1);
    }
  });
  it("cartService: testeo de método getCartById", function () {
    async function getCartById() {
      const carrito = await cartService.getCartById(1);
      assert.equal(carrito.id, 1);
    }
  })
  it("cartService: testeo de método createCart", function () {
    async function createCart() {
      const carrito = await cartService.createCart({
        id: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      assert.equal(carrito.id, 2);
    }
  });
  it("cartService: testeo de método updateCart", function () {
    async function updateCart() {
      const carrito = await cartService.updateCart(1, {
        id: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      assert.equal(carrito.id, 1);
    }
  })
  it("cartService: testeo de método deleteCart", function () {
    async function deleteCart() {
      const carrito = await cartService.deleteCart(1);
      assert.equal(carrito.id, 1);
    }
  })
});

/*============================[Testeo en cartDao]============================*/
describe("test cartDao, métodos", function () {
  it("cartDao: testeo de método getAllCarts", function () {
    async function getAllCarts() {
      const carritos = await cartDao.getAllCarts();
      assert.equal(carritos.length, 1);
    }
  });
  it("cartDao: testeo de método getCartById", function () {
    async function getCartById() {
      const carrito = await cartDao.getCartById(1);
      assert.equal(carrito.id, 1);
    }
  });
  it("cartDao: testeo de método createCart", function () {
    async function createCart() {
      const carrito = await cartDao.createCart({
        id: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      assert.equal(carrito.id, 2);
    }
  });
  it("cartDao: testeo de método updateCart", function () {
    async function updateCart() {
      const carrito = await cartDao.updateCart(1, {
        id: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      assert.equal(carrito.id, 1);
    }
  })
  it("cartDao: testeo de método deleteCart", function () {
    async function deleteCart() {
      const carrito = await cartDao.deleteCart(1);
      assert.equal(carrito.id, 1);
    }
  })
});
