import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  imagen: String,
  stock: {
    type: Number,
    default: 100
  }
});

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;
