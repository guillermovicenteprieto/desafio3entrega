import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import logger from "./src/utils/loggers.js";
import minimist from "minimist";
import os from "os";
import cluster from "cluster";
const numCPUs = os.cpus().length;
const argv = minimist(process.argv.slice(2))
const serverMode = argv.mode || "FORK";
/*============================[Servidor]============================*/
const PORT = process.env.PORT;
if (serverMode == "CLUSTER") {
  logger.info(`Primary: ${process.pid}`)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('listening', (worker, address) => {
    logger.info(`worker ${worker.process.pid} connected to ${address.port}`)
  })
} else {
  app
    .listen(PORT, () => logger.info(`Worker: ${process.pid} at http://localhost:${PORT} mode: ${serverMode}`))
    .on('error', (err) => logger.error(err));
}