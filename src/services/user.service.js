
import { userRepository } from '../repository/user.repository.js';
import { createHash } from '../utils.js';
import { isValidPassword } from '../utils.js';
import { generateJWToken } from '../utils.js';

export const registerUserService = async (userData) => {
  const { first_name, last_name, email, age, password } = userData;

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
  };

  return await userRepository.create(newUser);
};

export const loginUserService = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('User not found');

  const isValid = isValidPassword(user, password);
  if (!isValid) throw new Error('Invalid password');

  const token = generateJWToken(user);
  return { user, token };
};
