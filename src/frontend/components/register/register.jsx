import './register.scss';

import arrowIcon from '../../assets/arrow-right.svg';

import { useState } from 'react';

import Loader from '../../components/loader/loader.jsx';

function Register({ status, setStatus, setLoginStatus }) {

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (password === passwordConfirm) {
                const response = await fetch(import.meta.env.VITE_API_URL + '/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user: user,
                        email: email,
                        password: password
                    })
                })

                if (response) {
                    console.log('Usuario creado')
                    setStatus(false);
                    setLoginStatus(true);
                }
            } else {
                console.log('Las contrasenas no coinciden');
            }
        } catch (error) {
            console.error('Error al registrar el usuario: ', error);
        } finally {
            setLoading(false);
        }
    }

    const checkLoginStatus = () => {
        if (status) {
            setStatus(false);
            setLoginStatus(true);
        }
    }

    // Variable que permite renderizar o no el login dependiendo del estado //
    if (status)
        return (
            <div className="register-modal">
                <div className="top-row">
                    <img src={arrowIcon} alt="arrow-icon" onClick={() => setStatus(false)} />
                    <h1>Registro de Usuario</h1>
                </div>
                <div className="middle-row">
                    {loading ?
                        <div className="loader">
                            <Loader status={loading} />
                        </div>
                        :
                        <form onSubmit={handleRegister}>
                            <div className="username">
                                <input type="text" placeholder='Ingresa tu nombre de Usuario...' id='register-username' onChange={(e) => setUser(e.target.value)} required />
                            </div>
                            <div className="email">
                                <input type="email" placeholder='Ingresa tu Correo Electrònico...' id='register-email' onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="password" >
                                <input type="password" placeholder='Ingresa tu Contraseña...' id='register-password' onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="password-confirm">
                                <input type="password" placeholder='Confirma tu Contraseña ingresada...' id='register-password-confirm' onChange={(e) => setPasswordConfirm(e.target.value)} required />
                            </div>
                            <div className="bottom-row">
                                <button type='submit'>Unirse</button>
                                <h3>Ya tienes una cuenta?</h3>
                                <a onClick={() => checkLoginStatus()}>Ingresa aquí</a>
                            </div>
                        </form>
                    }
                </div>
            </div>
        )
}

export default Register;