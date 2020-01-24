const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientID,
      callbackURL: "/auth/google/callback"
    },
    accesToken => {
      console.log(accesToken);
    }
  )
);
/*new GoogleStrategy crea una nueva instancia de GoogleStrategy.
como argumentos a esa instancia le vamos a pasar una configuracion
para que sepa como autenticar los usuarios*/
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

const PORT = process.env.PORT || 5000;
/*Esta linea, toma el numero del puerto que nos paso Heroku como 
variable de entorno al iniciar la ejecucion de la app. Esta variable de 
entorno solo la vamos a tener si estamos usando la version de la app deployada 
en Heroku. De lo contrario, si estamos usando nuestro servidor local, el puerto 
va a ser el que determine Node a la hora de levantar el servidor. En nuestro caso 
PORT : 5000
 */

app.listen(PORT);
/*Esta ultima linea, le dice a Express, que le diga a Node que quiere
escuchar trafico entrante en el puerto 5000*/
