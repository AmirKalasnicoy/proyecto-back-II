import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  imagen: String
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
