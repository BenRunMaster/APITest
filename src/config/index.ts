import { config } from "dotenv";

if (process.env.NODE_ENV !== 'production') {
    config();
}

export const PORT = process.env.PORT;
export const URI_MONGO = process.env.URI_MONGO;
export const SECRET = process.env.SECRET;