const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys.js");
const mongoose = require('mongoose');

const User = mongoose.model('users');
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accesToken, refreshToken, profile, done) => {
      new User({ googleId: profile.id }).save(); //Este new User de aca crea una nueva
      //instancia de la Model Class 'users', cuyo esquema ya fue declarado por
      //userSchema en User.js
    }
  )
);

/*new GoogleStrategy crea una nueva instancia de GoogleStrategy.
como argumentos a esa instancia le vamos a pasar una configuracion
para que sepa como autenticar los usuarios*/
