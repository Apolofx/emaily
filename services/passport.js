const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accesToken, refreshToken, profile, done) => {
      console.log('acces token', accesToken);
      console.log('refresh token', refreshToken);
      console.log('profile:', profile);
    }
  )
);

/*new GoogleStrategy crea una nueva instancia de GoogleStrategy.
como argumentos a esa instancia le vamos a pasar una configuracion
para que sepa como autenticar los usuarios*/
