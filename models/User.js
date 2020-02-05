const mongoose = require("mongoose");
const { Schema } = mongoose;

//Esta es la manera ES2015 de llamar a una propiedad de una libreria y asignarla
//a una variable del mismo nombre. (ver que es tal cual como se usa en ReactJS)
const userSchema = new Schema({
  googleId: String
});

mongoose.model("users", userSchema); //con esta linea, cargamos el esquema que
//le dijimos anteriormente, en la coleccion user
