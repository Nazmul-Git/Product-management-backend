import Product from '../models/Product.js';
import generateProductCode from '../utils/generateProductCode.js';

// Create a new product
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, discount, image, status, category } = req.body;
    const productCode = generateProductCode(name);

    const product = new Product({
      name,
      description,
      price,
      discount: discount || 0,
      image,  
      status: status || 'In Stock',  
      productCode,
      category
    });

    await product.save();
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// Update product information
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, description, discount } = req.body;

    const updates = {};
    if (status) updates.status = status;
    if (description) updates.description = description;
    if (discount) updates.discount = discount;

    const product = await Product.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// Get all products 
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find(query).populate('category');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    next(err);
  }
};

// Get product by ID
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// Get products by category
const getProductsByCategory = async (req, res, next) => {
  try {
    const products = await Product.find({ 
      category: req.params.categoryId 
    }).populate('category');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    next(err);
  }
};

// Search products by name
const searchProductsByName = async (req, res, next) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.name, $options: 'i' }
    }).populate('category');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    next(err);
  }
};

export {
  createProduct,
  updateProduct,
  getProducts,
  getProduct,
  getProductsByCategory,
  searchProductsByName
};