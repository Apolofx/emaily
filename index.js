const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
/*mongoose es la libreria que se usa para contectarse con MongoDB*/

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 dias expresados en ms.
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets
  //like our main.js file, or main.css file!
  app.use(express.static("client/public"));
  //Express will serve up the index.html file
  //if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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
