import { model, Schema } from "mongoose";

const saleSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    producto: String,
    cantidad: Number,
    monto: Number,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    id_producto: Number
});

export const saleModel = model('Sale', saleSchema)