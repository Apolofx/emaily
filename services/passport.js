const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys.js");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id); //aca le pasamos el _id en una cookie
});

passport.deserializeUser((id, done) => {

})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accesToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser); //done() le avisa a passport que ya terminamos
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user)); //Este new User de aca crea una
        }
      });

      //instancia de la Model Class 'users', cuyo esquema ya fue declarado por
      //userSchema en User.js
    }
  )
);

/*new GoogleStrategy crea una nueva instancia de GoogleStrategy.
como argumentos a esa instancia le vamos a pasar una configuracion
para que sepa como autenticar los usuarios*/
