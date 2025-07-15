import express from 'express';
import {
  createCategory,
  getCategories
} from '../controllers/categoryController.js';

const router = express.Router();

// Create a category
router.post('/', createCategory);

// Get all categories
router.get('/', getCategories);

export default router;