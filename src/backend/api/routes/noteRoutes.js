import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import dotenv from 'dotenv';
import { Note } from '../../database/models/note.js';

const router = express.Router();

dotenv.config();

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find({});
        if (notes) {
            res.json(notes);
        }
    } catch (error) {
        return res.status(500).json({ 'Error al obtener las notas en el servidor: ': error })
    }
})

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, createdAt, color } = req.body;
        
        const newNote = new Note({
            title,
            description,
            createdAt,
            color,
            userId: req.user.id
        });

        await Note.insertOne(newNote);

        res.status(201).json({ 'Nota creada': newNote });
    } catch (error) {
        console.error('Error al crear la nota en el servidor: ', error);
        return res.status(500).json({ 'Error': error })
    }
})

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const noteId = req.params.id;

        await Note.findByIdAndDelete(noteId);

        res.status(202).json({
            message: 'Nota eliminada correctamente',
            note: noteId
        });
    } catch (error) {
        console.error('Error al borrar la nota en el servidor: ', error);
        return res.status(500).json({
            message: 'Error en el servidor al eliminar la nota',
            error: error
        })
    }
})

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { title, description, createdAt, color } = req.body;
        const noteId = req.params.id;

        const updatedNote = {
            title,
            description,
            createdAt,
            color,
            userId: req.user.id
        };

        await Note.findByIdAndUpdate(noteId, updatedNote, { new: true });

        res.status(201).json({
            message: 'Nota actualizada',
            note: updatedNote
        })

    } catch (error) {
        console.error('Error en el servidor al eliminar la nota: ', error);
        return res.status(500).json({
            messsage: 'Error en el servidor al eliminar la nota',
            error: error
        })
    }
})

export default router;