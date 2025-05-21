import './register.scss';

import arrowIcon from '../../assets/arrow-right.svg';

import { useState } from 'react';

function Register({ status, setStatus, setLoginStatus }) {

    const handleRegister = () => {

    }

       const checkLoginStatus = () => {
        if(status) {
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
                    <form onSubmit={handleRegister}>
                        <div className="username">
                            <input type="text" placeholder='Ingresa tu nombre de Usuario...' id='register-username' required />
                        </div>
                        <div className="email">
                            <input type="email" placeholder='Ingresa tu Correo Electrònico...' id='register-email' required />
                        </div>
                        <div className="password" >
                            <input type="password" placeholder='Ingresa tu Contraseña...' id='register-password' required />
                        </div>
                        <div className="password-confirm">
                            <input type="password" placeholder='Confirma tu Contraseña ingresada...' id='register-password-confirm' required />
                        </div>
                        <div className="bottom-row">
                            <button type='submit'>Unirse</button>
                            <h3>Ya tienes una cuenta?</h3>
                            <a onClick={() => checkLoginStatus()}>Ingresa aquí</a>
                        </div>
                    </form>
                </div>

            </div>
        )
}

export default Register;