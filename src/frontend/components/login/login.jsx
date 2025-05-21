import './login.css';

import arrowIcon from '../../assets/arrow-right.svg';

import { useState } from 'react';

function Login({ status, setStatus, setRegisterStatus }) {

    const handleLogin = () => {

    }

    // Si el modal de login esta abierto y el de registro cerrado, se cierra el modal de login y se abre el de registro //
    const checkRegisterStatus = () => {
        if(status) {
            setStatus(false);
            setRegisterStatus(true);
        }
    }
    // Variable que permite renderizar o no el login dependiendo del estado //
    if (status)
        return (
            <div className="login-modal">
                <div className="top-row">
                    <img src={arrowIcon} alt="arrow-icon" onClick={() => setStatus(false)} />
                    <h1>Inicio de Sesión</h1>
                </div>
                <div className="middle-row">
                    <form onSubmit={handleLogin}>
                        <div className="username">
                            <input type="text" placeholder='Ingresa tu nombre de Usuario...' id='username' required />
                        </div>
                        <div className="password" >
                            <input type="password" placeholder='Ingresa tu Contraseña...' id='password' required />
                        </div>
                        <p>Olvide mi Contraseña</p>
                        <div className="bottom-row">
                            <button type='submit'>Entrar</button>
                            <h3>No tienes una cuenta?</h3>
                            <a onClick={() => checkRegisterStatus()}>Registrate aquí</a>
                        </div>
                    </form>
                </div>

            </div>
        )
}

export default Login;