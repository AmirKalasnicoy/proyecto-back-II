import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import userModel from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';
import dotenv from "dotenv";
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Estrategias
const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

// leer cookies firmadas
const cookieExtractor = req => {
  let token = null;
  if (req && req.signedCookies) {
    token = req.signedCookies['jwtCookieToken'];
  }
  return token;
};

const initializePassport = () => {
  // REGISTER
  passport.use('register', new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email'
    },
    async (req, username, password, done) => {
      const { first_name, last_name, email, age } = req.body;

      try {
        const userExists = await userModel.findOne({ email });
        if (userExists) return done(null, false);

        const newUser = {
          first_name,
          last_name,
          email,
          age,
          password: createHash(password),
        };

        const result = await userModel.create(newUser);
        return done(null, result);
      } catch (error) {
        return done("Error en registro: " + error);
      }
    }
  ));

  // LOGIN
  passport.use('login', new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      try {
        const user = await userModel.findOne({ email: username });
        if (!user) return done(null, false, { message: "User not found" });

        if (!isValidPassword(user, password)) {
          return done(null, false, { message: "Invalid credentials" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  // JWT
  passport.use('jwt', new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
      secretOrKey: PRIVATE_KEY
    },
    async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload.user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initializePassport;
