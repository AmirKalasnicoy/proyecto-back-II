import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import passport from 'passport';
import initializePassport from './config/passport.config.js';

import viewsRouter from './routes/views.routes.js';
import usersViewRouter from './routes/users.views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import passwordRouter from './routes/password.router.js';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import './helpers/handlebars.js'

dotenv.config();

// Rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar app
const app = express();
const PORT = process.env.PORT || 9090;
const MONGO_URL = process.env.MONGO_URL;

// Conexión a MongoDB
const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to Mongo Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
connectMongoDB();

// Middlewares base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("CoderS3cr3tC0d3")); 
app.use(express.static(__dirname + '/public'));

// 📌 Agregá esto:
app.use(session({
  secret: 'CoderS3cr3tC0d3',
  resave: false,
  saveUninitialized: false
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session()); 

// Handlebars setup
const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Rutas
app.use('/', viewsRouter);                  
app.use('/users', usersViewRouter);          
app.use('/api/sessions', sessionsRouter);   
app.use('/api/sessions', passwordRouter); 
app.use('/products', productsRouter);
app.use('/cart', cartRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

