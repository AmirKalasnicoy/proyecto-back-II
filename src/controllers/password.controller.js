import { sendRecoveryEmail } from '../utils.js';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../utils.js';

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("Email recibido en /forgot-password",email)

  try {
    const token = jwt.sign({ email }, PRIVATE_KEY, { expiresIn: '1h' });

    await sendRecoveryEmail(email, token);

    res.status(200).json({ status: 'success', message: 'Email sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to send email' });
  }
};

