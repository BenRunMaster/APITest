import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const productSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    codigo: {
        type: String,
        required: true,
        unique: true,
    },
    producto: String,
    precio_unitario: Number,
    descuento: Number,
    existencia: Number,
    activo: Boolean,
    updated_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export const productModel = model('Product', productSchema);