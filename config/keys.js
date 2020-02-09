//logica para saber que ceredenciales usar
if (process.env.NODE_ENV === "production") {
  //we are in production return prod keys
  module.exports = require("./prod");
} else {
  //si estamos en dev, entonces devolvemos las dev keys, que estan en./dev
  module.exports = require("./dev");
}
