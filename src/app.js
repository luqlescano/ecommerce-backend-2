import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import config from './config.js';
import { initializePassport } from './utils/passport.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();

const uri = config.MONGODB_URI;
mongoose.connect(uri)
    .then(() => console.log("Conexión con MongoDB Atlas exitosa"))
    .catch((error) => console.error("Hubo un error al querer conectar con MongoDB Atlas:", error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine('handlebars', handlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

initializePassport();

app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(config.PORT, () => {
    console.log(`Servidor activo en http://localhost:${config.PORT}`);
});