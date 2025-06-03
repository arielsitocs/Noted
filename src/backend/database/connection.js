import mongoose from "mongoose";
import dotenv from "dotenv";

// Se define dotenv para cargar las variables de entorno //
dotenv.config();

async function Connection() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("Conectado a la base de datos."));
    } catch (error) {
        console.error("Error al conectar a la base de datos: ", error);
        
    }
}

export default Connection;