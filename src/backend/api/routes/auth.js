import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from '../../database/models/user.js';
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validacion inicial de campos //
        if(!username || !password) {
           return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Buscar el usuario en la BD //
        const user = await User.findOne({ username })
        if(!user) {
           return res.status(401).json({ message: 'El usuario no fue encontrado' })
        }

        // Comparar las contrasenas si el usuario existe //
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            return res.status(401).json({ message: 'Contrasena incorrecta' });
        }

        // Crear TOKEN firmado con datos del usuario y el secreto JWT // 
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        // Enviamos el token de vuelta si el inicio de sesion es exitoso junto con datos del usuario //
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ 'Error al autenticarse en el servidor': error });
    }
})

export default router;