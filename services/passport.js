const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys.js");
const mongoose = require("mongoose");

const User = mongoose.model("users");

/*serializeUser determines which data of the user object 
should be stored in the session.*/
passport.serializeUser((user, done) => {
  done(null, user.id); //aca le pasamos el _id en una cookie
});

/*deserializeUser nos entrega el id
que vino en la cookie que nos envio el browser del cliente en la request, y 
lo agrega al objeto request como req.user*/
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accesToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser); //done() le avisa a passport que ya terminamos
      }

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);

/*new GoogleStrategy crea una nueva instancia de GoogleStrategy.
como argumentos a esa instancia le vamos a pasar una configuracion
para que sepa como autenticar los usuarios*/
