import express from 'express';
// Modulo de encriptacion de contrasenas //
import bcrypt from 'bcryptjs';
import { User } from '../../database/models/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        if (users) {
            res.status(200).json(users);
        }
    } catch (error) {
        console.error('Error al obtener los usuarios en el servidor: ', error);
        res.status(500).json({ 'Error': error });
    }
})

router.post('/', async (req, res) => {
    try {
        const { username, email, password, createdAt } = req.body;

        console.log('Nombre de usuario serviodor: ', username)

        // Numero de rondas de encriptacion //
        const salt = await bcrypt.genSalt(10);
        // Hasheo de la contrasena //
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            createdAt
        })

        const createdUser = await User.insertOne(newUser);

        if (createdUser) {
            res.status(201).json({ 'Usuario creado': createdUser });
        }
    } catch (error) {
        console.error('Error al crear el usuario en el servidor: ', error);
        res.status(500).json({ 'Error': error });
    }
})

export default router;

