import passport from 'passport';

export const authMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) return res.redirect('/login');
    req.user = user;
   

    next();
  })(req, res, next);
};

