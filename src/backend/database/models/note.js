import mongoose from 'mongoose';

const note = new mongoose.Schema({
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
        default: new Date(),
        required: true
    },
    color: {
        type: String,
    },
    userId: {
        type: String,
        required: true
    },
})

const Note = mongoose.model('Note', note);

export default Note;