import axios from "axios";
import logger from "../../src/utils/loggers.js";
import fs from "fs";

class testAxios {
  constructor() {
  }

  async testGetAllProducts() {
    try {
      logger.info(`Se registra petición GET /api/productos`);
      const urlTest = "http://localhost:8080/api/productos";
      const response = await axios.get(urlTest);
      logger.info(`Se obtienen productos`);
      fs.writeFileSync("./test//testAxios/testGetAllProducts.json", JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      logger.error(`Error al obtener productos`);
      throw err;
    }
  }

  async testGetProductById(id) {
    try {
      logger.info(`Se registra petición GET /api/productos/${id}`);
      const urlTest = `http://localhost:8080/api/productos/${id}`;
      const response = await axios.get(urlTest);
      logger.info(`Se obtiene producto`);
      fs.writeFileSync("./test/testAxios/testGetProductById.json", JSON.stringify(response.data));
      return response.status;
    } catch (err) {
      logger.error(`Error al obtener producto`);
      throw err;
    }
  }

  async testCreateProduct(product) {
    try {
      logger.info(`Se registra petición POST /api/productos`);
      const urlTest = `http://localhost:8080/api/productos/`;
      const response = await axios.post(urlTest, product);
      logger.info(`Se crea producto`);
      const producto = product 
      fs.writeFileSync("./test/testAxios/testCreateProduct.json", 
      JSON.stringify(`testCreateProduct: Status ${response.status} - ${JSON.stringify(producto)}`));
      return response.status;
    } catch (err) {
      logger.error(`Error al crear producto`);
      throw err;
    }
  }

   async testUpdateProduct(id, product) {
    try {
      logger.info(`Se registra petición PUT /api/productos/${id}`);
      const urlTest = `http://localhost:8080/api/productos/${id}`;
      const response = await axios.put(urlTest, product);
      logger.info(`Se actualiza producto`);
      const producto = product
      fs.writeFileSync("./test/testAxios/testUpdateProduct.json",
      JSON.stringify(`testUpdateProduct: - ${JSON.stringify(producto)}`));
    } catch (err) {
      logger.error(`Error al actualizar producto`);
      throw err;
    }
  }

  async testDeleteProduct(id) {
    try {
      logger.info(`Se registra petición DELETE /api/productos/${id}`);
      const urlTest = `http://localhost:8080/api/productos/${id}`;
      const response = await axios.get(urlTest);
      logger.info(`Se elimina producto`);
      fs.writeFileSync("./test/testAxios/testDeleteProduct.json", JSON.stringify(response.data));
      return response.status;
    } catch (err) {
      logger.error(`Error al eliminar producto`);
      throw err;
    }
  }
}

export default new testAxios();
