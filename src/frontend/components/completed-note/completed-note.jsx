import './completed-note.css';

import RestoreIcon from '../../assets/restore-icon.svg';
import DeleteIcon from '../../assets/delete-icon.svg';

function CompletedNote({ id, title, description, completedAt, userId, color, handleDeleteNote, handleRestoreNote }) {

    return (
        <div className="completed-note" style={{ backgroundColor: color }}>
            <div className="top-row">
                <div className="completed-at">
                    <p>Completada: {completedAt}</p>
                </div>
                <div className="buttons">
                    <button className='restore' onClick={handleRestoreNote}><img src={RestoreIcon} alt="restore-icon" /></button>
                    <button className='delete' onClick={handleDeleteNote}><img src={DeleteIcon} alt="delete-icon" /></button>
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

export default CompletedNote;