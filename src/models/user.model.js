import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  age: Number,
  password: String,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carts',
    default: null
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'premium'],
  }
});

const userModel = mongoose.model(collection, schema);


export default userModel;
