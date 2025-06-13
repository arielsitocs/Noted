import './trash.css';

import { useState, useEffect, useContext } from "react";

import CompletedNote from "../../components/completed-note/completed-note.jsx";
import Loader from '../../components/loader/loader.jsx';
import AlertAction from '../../components/alert-action/alert-action.jsx';
import { AuthContext } from '../../../backend/context/authContext.jsx';

import SadFace from '../../assets/sad-icon.svg';

function Trash() {

    const { user } = useContext(AuthContext)

    const [completedNotes, setCompletedNotes] = useState([]);
    const [deleteAlertStatus, setDeleteAlertStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [noteToDeleteId, setNoteToDeleteId] = useState(null);

    useEffect(() => {
        const fetchCompletedNotes = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/completedNotes`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await response.json();
                setCompletedNotes(data);
            } catch (error) {
                console.error('Error al cargar las notas completadas:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompletedNotes();
    }, [])


    // Funcion que restuara la nota encontrada a la tabla de notas base y elimina esta misma de la tabla de notas completadas //
    const handleRestoreNote = async (id) => {
        try {
            setIsLoading(true);
            const note = completedNotes.find((note) => note._id === id);

            if (note) {
                const addToNotesResponse = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        title: note.title,
                        description: note.description,
                        createdAt: note.createdAt,
                        color: note.color,
                        userId: note.userId,
                    })
                })

                if (addToNotesResponse) {
                    const deleteFromCompletedNotesResponse = await fetch(`${import.meta.env.VITE_API_URL}/completedNotes/${note._id}`, {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                    })

                    if (deleteFromCompletedNotesResponse) {
                        window.location.reload();
                    }
                }
            } else {
                console.error('Nota no encontrada');
            }
        } catch (error) {
            console.error('Error al restaurar la nota: ', error);
        } finally {
            setIsLoading(false);
        }
    }

    // Funcion que establece el id de la nota a eliminar, y abre el alert de confirmacion //
    const handleAskDeleteNote = (id) => {
        setNoteToDeleteId(id);
        setDeleteAlertStatus(true);
    };

    // Si el usuario confirma la eliminacion, se ejecuta el handleDeleteNote, que elimina la nota de forma permanente //
    const handleDeleteNote = async () => {
        setDeleteAlertStatus(false);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/completedNotes/${noteToDeleteId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.ok) {
                console.log('Nota eliminada permanentemente');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error al eliminar la nota permanentemente: ', error);
        } finally {
            setNoteToDeleteId(null);
        }
    };

    return (
        <>
            <div className="trash-content">
                {isLoading ?
                    <div className="loader-container">
                        <Loader status={isLoading} />
                    </div>
                    :
                    completedNotes.length != 0 ?
                        <>
                            <div className='trash-title'>
                                <h1>Notas Completadas</h1>
                            </div>
                            <div className="completed-notes">
                                {
                                    completedNotes.map(completedNote => {
                                        // Solo muestra las notas completadas por el usuario logueado //
                                        if (String(completedNote.userId) === String(user.id)) {
                                            return (
                                                <CompletedNote key={completedNote._id} id={completedNote._id} title={completedNote.title} description={completedNote.description} completedAt={completedNote.completedAt} userId={completedNote.userId} color={completedNote.color} handleRestoreNote={() => handleRestoreNote(completedNote._id)} handleDeleteNote={() => handleAskDeleteNote(completedNote._id)} />
                                            )
                                        }
                                    })
                                }
                            </div>
                        </>
                        :
                        <div className="no-notes">
                            <img src={SadFace} alt="sad-icon" />
                            <h1>Aún no tienes notas completadas</h1>
                        </div>
                }
            </div>
            <AlertAction status={deleteAlertStatus} setStatus={setDeleteAlertStatus} message={'¿Quieres borrar la nota?'} action={handleDeleteNote} />
        </>
    );
}

export default Trash;