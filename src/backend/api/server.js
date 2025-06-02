import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Connection from '../database/connection.js';

// Importamos todas las rutas de notas //
import notesRoutes from '../api/routes/noteRoutes.js';
// Importamos todas las rutas de notas completadas //
import completedNoteRoutes from '../api/routes/completedNotesRoutes.js'

// Conexion a la BD de mongoose //
Connection();

// Traer todas las variables de entorno //
dotenv.config();

const app = express();

app.use(express.json());
// Usamos cors para evitar errores al conectar el frontend con el backend //
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log('Servidor escuchando...')
});

app.get('/', (request, response) => {
    response.send('Estas usando la ruta base de la API de Noted.')
})

// Traemos todas las rutas de los archivos de rutas para poder usarlas //
app.use('/notes', notesRoutes);
app.use('/completedNotes', completedNoteRoutes);




