const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

//Esta es la manera ES2015 de llamar a una propiedad de una libreria y asignarla
//a una variable del mismo nombre. (ver que es tal cual como se usa en ReactJS)
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponse: Date
});

mongoose.model("surveys", surveySchema); //con esta linea, cargamos el esquema que
//le dijimos anteriormente, en la coleccion user
