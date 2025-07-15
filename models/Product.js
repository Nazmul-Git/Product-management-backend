import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be at least 0']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount must be at least 0'],
    max: [100, 'Discount cannot be more than 100']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  status: {
    type: String,
    required: true,
    enum: ['In Stock', 'Stock Out'],
    default: 'In Stock'
  },
  productCode: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',  
    required: [true, 'Product must belong to a category'],
    validate: {
      validator: async function (categoryId) {
        const category = await mongoose.model('categories').findById(categoryId);
        return !!category; 
      },
      message: 'Invalid category: Category does not exist'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate final price after discount
ProductSchema.virtual('finalPrice').get(function () {
  return this.price * (1 - this.discount / 100);
});

// Ensure virtuals are included when converting to JSON
ProductSchema.set('toJSON', { virtuals: true });

// Export the model
export default mongoose.models.products || mongoose.model('products', ProductSchema);