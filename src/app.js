import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import passport from 'passport';
import initializePassport from './config/passport.config.js';

import viewsRouter from './routes/views.routes.js';
import usersViewRouter from './routes/users.views.router.js';
import sessionsRouter from './routes/sessions.router.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 9090;
const MONGO_URL = process.env.MONGO_URL;

// MongoDB connection
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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("CoderS3cr3tC0d3"));
app.use(express.static(__dirname + '/public'));


// Handlebars setup
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Passport setup
initializePassport();
app.use(passport.initialize());

// Routers
app.use('/', viewsRouter);
app.use('/users', usersViewRouter);
app.use('/api/sessions', sessionsRouter);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


