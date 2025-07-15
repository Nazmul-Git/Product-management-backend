import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Route files
import products from './routes/productRoutes.js';
import categories from './routes/categoryRoutes.js';

const app = express();

// Body parser
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/products', products);
app.use('/api/categories', categories);


export default app;