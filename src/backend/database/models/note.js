import mongoose from 'mongoose';
import moment from 'moment-timezone';

// Esquema de nota base //

const noteFields = {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: () => moment().tz('America/Santiago').format('DD-MM-YYYY'),
    },
    color: {
        type: String,
    },
    userId: {
        type: String,
        required: true
    },
}

// Nota base usando los campos base de nota //

const noteSchema = new mongoose.Schema(noteFields);

export const Note = mongoose.model('Note', noteSchema);

// Esquema de nota completada heredada de nota base, modificando del atributo createdAt //

const completedNoteSchema = new mongoose.Schema({
    ...noteFields,
    createdAt: {
        type: String,
        required: true
    },
    completedAt: {
        type: String,
        default: () => moment().tz('America/Santiago').format('DD-MM-YYYY'),
        required: true
    }
})

export const CompletedNote = mongoose.model('CompletedNote', completedNoteSchema);

