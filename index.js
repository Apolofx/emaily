const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send({ bye: "trolo" });
});
/* Route Handler:
    ver que app.get(ruta, funcion) tiene 2 paramentros.
    el primero es la ruta a donde se dirige el incoming request
    El segundo es parametro es la funcion (arrow function) que
    se va a ejecutar cuando llegue una request. Seria como un callback.
*/

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
