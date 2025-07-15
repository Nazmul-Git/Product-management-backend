import express from 'express';
import {
  createProduct,
  updateProduct,
  getProducts,
  getProduct,
  getProductsByCategory,
  searchProductsByName
} from '../controllers/productController.js';

const router = express.Router();


router.post('/', createProduct);
router.put('/:id', updateProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/category/:categoryId', getProductsByCategory);
router.get('/search/name/:name', searchProductsByName);

export default router;   
