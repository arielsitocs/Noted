import './note.css';

import ConfirmIcon from '../../assets/ok-icon.svg';
import EditIcon from '../../assets/edit-icon.svg';

function Note({ title, description, createdAt, userId }) {
    return (
        <div className="note">
            <div className="top-row">
                <div className="created-at">
                    <p>Creada: {createdAt}</p>
                </div>
                <div className="buttons">
                    <button className='complete'><img src={ConfirmIcon} alt="complete-icon" /></button>
                    <button className='edit'><img src={EditIcon} alt="edit-icon" /></button>
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