import { createContext, useState } from "react";

// Creamos un contexto vacio //
export const AuthContext = createContext();

// Llenamos el contexto //
export const AuthProvider = ({ children }) => {
    // Verifica si hay un usuario en el local storage para guardarlo o devuelve null si no lo hay //
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Error al parsear el usuario: ", error);
            localStorage.removeItem('user'); // Limpia datos corruptos //
            return null;
        }
    });

    // Login que guarda el usuario y su token en el local storage //
    const login = (userData, token) => {
        try {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', token)
        } catch (error) {
            console.error('Error al guardar el usuario: ', error);
        }
    }

    // Logout que reinicia el usuario y borra el usuario en el locla storage //
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}