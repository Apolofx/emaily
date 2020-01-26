const express = require("express");
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, {useNewUrlParser: true });
/*mongoose es la libreria que se usa para contectarse con MongoDB*/

const app = express();

require('./routes/authRoutes')(app);

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
