import userModel from '../models/user.model.js';

export const findUserByEmail = async (email) => {
  return await userModel.findOne({ email });
};

export const createUser = async (userData) => {
  return await userModel.create(userData);
};
