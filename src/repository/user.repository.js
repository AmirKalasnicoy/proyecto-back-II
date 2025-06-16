
import userModel from '../models/user.model.js';

export const userRepository = {
  findByEmail: async (email) => {
    return await userModel.findOne({ email });
  },
  create: async (userData) => {
    return await userModel.create(userData);
  }
};
