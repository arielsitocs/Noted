import './alert.css';

import AlertIcon from '../../assets/alert-icon.svg';

function Alert({ status, message }) {
    if (status)
        return (
            <div className="alert-container">
                <div className="alert">
                    <img src={AlertIcon} alt="alert-icon" />
                    <h1>{message}</h1>
                </div>
            </div>
        )
}

export default Alert;