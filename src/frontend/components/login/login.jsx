import './login.css';

import Alert from '../alert/alert.jsx';

import arrowIcon from '../../assets/arrow-right.svg';

import { useState, useContext } from 'react';
import { AuthContext } from '../../../backend/context/authContext.jsx';

function Login({ status, setStatus, setRegisterStatus }) {

    // Traemos variables y funciones del contexto de auth //
    const { login } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorStatus, setErrorStatus] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })

            const data = await response.json();

            if (response.status == 400) {
                setError('Todos los campos son obligatorios');
                setErrorStatus(true);
                setTimeout(() => {
                    setErrorStatus(false);
                }, 3000)
            } else if (response.status == 401) {
                setError('Usuario o Contraseña incorrectos');
                setErrorStatus(true);
                setTimeout(() => {
                    setErrorStatus(false);
                }, 3000)
            } else if (response.status == 200) {
                login(data.user, data.token);
                setStatus(false);
            }
        } catch (error) {
            console.error('Error al iniciar sesion: ', error)
        }
    }

    // Si el modal de login esta abierto y el de registro cerrado, se cierra el modal de login y se abre el de registro //
    const checkRegisterStatus = () => {
        if (status) {
            setStatus(false);
            setRegisterStatus(true);
        }
    }
    // Variable que permite renderizar o no el login dependiendo del estado //
    if (status)
        return (
            <>
                <div className="login-modal">
                    <div className="top-row">
                        <img src={arrowIcon} alt="arrow-icon" onClick={() => setStatus(false)} />
                        <h1>Inicio de Sesión</h1>
                    </div>
                    <div className="middle-row">
                        <form onSubmit={handleLogin}>
                            <div className="username">
                                <input type="text" placeholder='Ingresa tu nombre de Usuario...' id='username' onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="password" >
                                <input type="password" placeholder='Ingresa tu Contraseña...' id='password' onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className='forgot-password'>
                                <p>Olvide mi Contraseña</p>
                            </div>
                            {errorStatus ? <div className="error-message">
                                <h4>{error}</h4>
                            </div> : <></>}
                            <div className="bottom-row">
                                <button type='submit'>Entrar</button>
                                <h3>No tienes una cuenta?</h3>
                                <a onClick={() => checkRegisterStatus()}>Registrate aquí</a>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
}

export default Login;