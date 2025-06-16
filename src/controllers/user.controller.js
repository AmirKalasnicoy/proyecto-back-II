import { loginUserService } from '../services/user.service.js';
import { registerUserService } from '../services/user.service.js';

export const registerUser = async (req, res) => {
  try {
    const createdUser = await registerUserService(req.body);
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      payload: createdUser
    });
  } catch (error) {
    if (error.message === 'User already exists') {
      return res.status(400).json({ status: 'error', message: error.message });
    }

    console.error('Error in registerUser:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginUserService(email, password);

    res.cookie('jwtCookieToken', token, {
      httpOnly: true,
      signed: true
    });

    res.json({ status: 'success', message: 'Login successful' });
  } catch (error) {
    const msg = error.message === 'Invalid password' || error.message === 'User not found'
      ? error.message
      : 'Internal server error';

    res.status(error.message === msg ? 401 : 500).json({ status: 'error', message: msg });
  }
};