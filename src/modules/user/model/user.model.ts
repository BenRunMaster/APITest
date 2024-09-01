import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
    required: true,
  },
  documento: {
    type: String,
    unique: true,
    required: true,
  },
  nombre: String,
  correo: String,
  telefono: Number,
  usuarioVentas: String,
  passwordVentas: String,
  usuarioAdmin: String,
  passwordAdmin: String,
  sesionActiva: Boolean
});

export const userModel = model('User', userSchema);