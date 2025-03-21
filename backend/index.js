import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js'
import sheetsRoutes from './src/routes/sheetsRoutes.js'

dotenv.config({
  path: './.env'
});

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === process.env.CLIENT_URL) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'], 
  credentials: true
}));



// Routes
 app.get('/', (req, res) => {
  res.send('server is running...');
});

 // API routes
app.use('/api/auth', authRoutes);
app.use('/api/sheets', sheetsRoutes);



// Server
const PORT = process.env.PORT || 5500;
const server = http.createServer(app);
server.listen(PORT, async() => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});