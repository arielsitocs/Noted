import express from 'express';
import { CompletedNote } from '../../database/models/note.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const completedNotes = await CompletedNote.find({});
        res.json(completedNotes);
    } catch (error) {
        console.error('Error al obtener las notas completadas', error)
        res.status(500).json({
            message: 'Error al obtener las notas completadas',
            error: error
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, description, createdAt, color, userId } = req.body;

        const newNote = new CompletedNote({
            title,
            description,
            createdAt,
            color,
            userId
        });

        await CompletedNote.insertOne(newNote);

        res.status(201).json({ 'Nota completada': newNote });
    } catch (error) {
        console.error('Error al completar la nota en el servidor: ', error);
        res.status(500).json({ 'Error': error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const noteId = req.params.id;

        await CompletedNote.findByIdAndDelete(noteId);

        res.status(202).json({
            message: 'Nota eliminada permanentemente',
            note: noteId
        });
    } catch (error) {
        console.error('Error al borrar la nota de manera permamente en el servidor: ', error);
        res.status(500).json({
            message: 'Error en el servidor al eliminar la nota permanentemente',
            error: error
        })
    }
})

export default router;