import express from 'express';
import { Note } from '../../database/models/note.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find({});
        if (notes) {
            res.json(notes);
        }
    } catch (error) {
        res.status(500).json({ 'Error al obtener las notas en el servidor: ': error })
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, description, createdAt, color, userId } = req.body;

        const newNote = new Note({
            title,
            description,
            createdAt,
            color,
            userId
        });

        await Note.insertOne(newNote);

        res.status(201).json({ 'Nota creada': newNote });
    } catch (error) {
        console.error('Error al crear la nota en el servidor: ', error);
        res.status(500).json({ 'Error': error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const noteId = req.params.id;

        await Note.findByIdAndDelete(noteId);

        res.status(202).json({
            message: 'Nota eliminada correctamente',
            note: noteId
        });
    } catch (error) {
        console.error('Error al borrar la nota en el servidor: ', error);
        res.status(500).json({
            message: 'Error en el servidor al eliminar la nota',
            error: error
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { title, description, createdAt, color, userId } = req.body;
        const noteId = req.params.id;

        const updatedNote = {
            title,
            description,
            createdAt,
            color,
            userId
        };

        await Note.findByIdAndUpdate(noteId, updatedNote, { new: true });

        res.status(201).json({
            message: 'Nota actualizada',
            note: updatedNote
        })

    } catch (error) {
        console.error('Error en el servidor al eliminar la nota: ', error);
        res.status(500).json({
            messsage: 'Error en el servidor al eliminar la nota',
            error: error
        })
    }
})

export default router;