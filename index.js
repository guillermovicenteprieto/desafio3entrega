import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";
import handlebars from "express-handlebars";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import "./src/database.js";
import { loginStrategy, signupStrategy } from "./src/middlewares/passportLocal.js";
import compression from "compression";
import logger from "./src/utils/loggers.js";
import minimist from "minimist";
import os from "os";
import cluster from "cluster";
import routeCart from "./src/routes/routeCart.js";
import routerInfo from "./src/routes/routeInfo.js";
import routeProduct from "./src/routes/routeProduct.js";
import routeUser from "./src/routes/routeUser.js";
const numCPUs = os.cpus().length;
const argv = minimist(process.argv.slice(2))
const serverMode = argv.mode || "FORK";

const app = express();

/*============================[Middlewares]============================*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use(session({
  secret: process.env.SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: Number(process.env.EXPIRATION_TIME) || 60 * 60 * 10000
  },
}));

passport.use('login', loginStrategy);
passport.use('signup', signupStrategy);

app.use(passport.initialize());
app.use(passport.session());

/*=======================[Motor de Plantillas]=======================*/
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  defaultLayout: 'main.hbs',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
}));

app.set('view engine', 'hbs');
app.set('views', './views');

/*============================[Rutas Info]============================*/
app.use('/', routerInfo);

/*============================[Rutas API]============================*/
app.use('/', routeUser);
app.use('/api', routeProduct);
app.use('/api', routeCart);


app.get('*', (req, res) => {
  logger.warn({
    404: `${req.method} ${req.url}`,
  });
  res.status(404).send('Error 404: ruta no definida');
});

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