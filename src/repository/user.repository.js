import { findUserByEmail, createUser } from '../dao/user.dao.js';

export const userRepository = {
  findByEmail: findUserByEmail,
  create: createUser
};

