import './alert-action.css';

import AlertIcon from '../../assets/alert-icon.svg';

function AlertAction({ status, setStatus, message, action }) {
    if (!status) return null;

    const handleAction = () => {
        if (action) {
            action();
            setStatus(false);
        }
    };

    return (
        <div className="alert-action-container">
            <div className="alert-action">
                <img src={AlertIcon} alt="alert-icon" />
                <h1>{message}</h1>
                <div className="action-buttons">
                    <button id='ok-button' onClick={handleAction}>OK</button>
                    <button id='cancel-button' onClick={() => setStatus(false)}>CANCELAR</button>
                </div>
            </div>
        </div>
    );
}

export default AlertAction;