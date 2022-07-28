import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import logger from "./src/utils/loggers.js";
import minimist from "minimist";
import os from "os";
import cluster from "cluster";
const numCPUs = os.cpus().length;
const argv = minimist(process.argv.slice(2));
const serverMode = argv.mode || "FORK";

/*==============[Test de solicitudes utilizando Axios]==============*/
import testAxios from "./test/testAxios/testAxios.js";
//testAxios.testGetAllProducts();
// testAxios.testGetProductById("62c4bde38435dbcacac3316c");
// testAxios.testCreateProduct({
//   nombre: "Producto de prueba",
//   precio: "100",
//   stock: "10",
//   descripcion: "creación de producto para Test Axios",
//   imagen: "Imagen de prueba"
// });
// testAxios.testUpdateProduct("62cf8383c7b9af07acb76d6d", {
//   nombre: "Actualización de producto ",
//   precio: "100",
//   stock: "10",
//   descripcion: "Actualización de producto para Test Axios",
//   imagen: "Imagen de prueba"
// });
//testAxios.testDeleteProduct("62c4bde38435dbcacac3316c");

/*============================[Servidor]============================*/
const PORT = process.env.PORT;
if (serverMode == "CLUSTER") {
  logger.info(`Primary: ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("listening", (worker, address) => {
    logger.info(`worker ${worker.process.pid} connected to ${address.port}`);
  });
} else {
  app
    .listen(PORT, () =>
      logger.info(
        `Worker: ${process.pid} at http://localhost:${PORT} mode: ${serverMode}`
      )
    )
    .on("error", (err) => logger.error(err));
}
