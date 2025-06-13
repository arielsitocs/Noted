import './note.css';

import ConfirmIcon from '../../assets/ok-icon.svg';
import EditIcon from '../../assets/edit-icon.svg';
import StarIcon from '../../assets/star-icon.png';
import StarIconFilled from '../../assets/star-icon-filled.png';

import Loader from '../loader/loader';
import { useState } from 'react';

function Note({ id, title, description, createdAt, featured, color, findUpdateNote, handleCompleteNote }) {

    const [isFeatured, setIsFeatured] = useState(() => {
        if (featured) {
            return true
        } else {
            return false
        }
    })
    const [loading, setLoading] = useState(false);

    const handleFeatureNote = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ featured: featured })
            })

            if (response.status === 200) {
                if (isFeatured) {
                    setIsFeatured(false);
                } else {
                    setIsFeatured(true);
                }
                console.log('Nota destacada')
            } else {
                console.error('Error al destacar la nota')
            }
        } catch (error) {
            console.error("Error al destacar la nota: ", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="note" style={{ backgroundColor: color }}>
            <div className="top-row">
                <div className="featured">
                    {loading ?
                        <div className="loader-container">
                            <Loader status={loading} width={'24px'} height={'24px'} />
                        </div>
                        :
                        <>
                            {isFeatured ?
                                <img src={StarIconFilled} alt='featured-star' className='featured-icon' onClick={() => handleFeatureNote(id)}></img>
                                :
                                <img src={StarIcon} alt="star" className='featured-icon' onClick={() => handleFeatureNote(id)} />
                            }
                        </>
                    }
                </div>
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
        </div >
    )
}

export default Note;