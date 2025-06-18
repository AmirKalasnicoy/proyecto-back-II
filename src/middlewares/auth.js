
export const authMiddleware = (req, res, next) => {
  if (req.user) return next();
  return res.redirect('/login');
};
