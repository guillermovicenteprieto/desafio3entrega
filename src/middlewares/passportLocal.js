import passport from "passport";
import { Strategy } from "passport-local";
import { isValidPassword, createHash } from "./validate.js";
import { User } from "../models/User.js";

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => User.findById(id, done));

export const loginStrategy = new Strategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    if (!isValidPassword(user, password)) return done(null, false);
    return done(null, user);
  });
});

export const signupStrategy = new Strategy(
  { passReqToCallback: true },
  (req, username, password, done) => {
    User.findOne({ username: username }, async function (err, user) {
      if (err) return done(err);
      if (user) return done(null, false);
      const newUser = {
        name: req.body.name,
        lastname: req.body.lastName,
        adress: req.body.adress,
        age: req.body.age,
        phone: req.body.phone,
        image: req.file.image,
        username: req.body.username,
        email: req.body.email,
        password: createHash(password),
      };

      User.create(newUser, (err, userWithId) => {
        if (err) return done(err);
        return done(null, userWithId);
      });
      // image = newUser.image
      // const processImage = sharp(image.buffer)
      // const data = await processImage.resize(200, 200).toBuffer();
      // fs.writeFileSync(`avatar/Users/${image.originalname}`, data);
      // newUser.image=data
    });
  }
);
