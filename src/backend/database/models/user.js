import mongoose from "mongoose";
import moment from "moment-timezone";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: () => moment().tz('America/Santiago').format('DD-MM-YYYY'),
    }
})

export const User = mongoose.model('User', userSchema);
