import ProductsClass from "../class/classProducts.js";
const productsClass = new ProductsClass();
const listProducts = await productsClass.getAllProducts()

const allProducts = listProducts.map
  (producto => {
    return {
      id: producto.id,
      name: producto.name,
      price: producto.price,
      stock: producto.stock,
      description: producto.description,
      url: producto.url,
      image: producto.url,
      category: producto.category,
      timestamp: producto.timestamp
    }
  })

export default allProducts;