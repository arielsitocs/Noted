import './note.css';

import ConfirmIcon from '../../assets/ok-icon.svg';
import EditIcon from '../../assets/edit-icon.svg';

function Note({ id, title, description, createdAt, userId, color, findUpdateNote, handleCompleteNote }) {
    return (
        <div className="note" style={{ backgroundColor: color }}>
            <div className="top-row">
                <div className="created-at">
                    <p>Creada: {createdAt}</p>
                </div>
                <div className="buttons">
                    <button className='complete' onClick={handleCompleteNote}><img src={ConfirmIcon} alt="complete-icon" /></button>
                    <button className='edit' onClick={findUpdateNote}><img src={EditIcon} alt="edit-icon" /></button>
                </div>
            </div>
            <div className="middle-row">
                <h1>{title}</h1>
            </div>
            <div className="bottom-row">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Note;