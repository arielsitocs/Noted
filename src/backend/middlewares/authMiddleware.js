import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        let token = null;

        // Rescatamos la autorizacion desde la peticion //
        let authorization = req.get('authorization');

        // Verificamos si hay autorizacion y si la autorizacion comienza con bearer //
        if (authorization && authorization.toLowerCase().startsWith('bearer')) {
            token = authorization.substring(7);
        }

        // Se verifica el token recibido con nuestro secreto para comprobar que sea verdadero //
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        // Si no hay token o el token decodificado no contiene el id de usuario el token es invalido //
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'Token faltante o invalido' })
        }

        // Enviamos el user en la peticion con los datos del token codificado //
        req.user = decodedToken;
        next();
    } catch (error) {
        console.log('Error al validar el token: ', error); 
        return res.status(401).json({ error: 'Error al validar el token' })
    }
}

export default authMiddleware;