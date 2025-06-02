import './trash.css';

import { useState, useEffect } from "react";

import CompletedNote from "../../components/completed-note/completed-note.jsx";

import { CompletedNote as CompletedNoteModel } from "../../../backend/database/models/note.js";

import SadFace from '../../assets/sad-icon.svg';

function Trash() {

    const [completedNotes, setCompletedNotes] = useState([]);

    useEffect(() => {
        const fetchCompletedNotes = async () => {
            try {
                const response = await fetch('http://localhost:3000/completedNotes', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await response.json();
                setCompletedNotes(data);
            } catch (error) {
                console.error('Error al cargar las notas completadas:', error);
            }
        };

        fetchCompletedNotes();
    }, [])

    const handleRestoreNote = async (id) => {
        try {
            const note = completedNotes.find((note) => note._id === id);

            if (note) {
                const addToNotesResponse = await fetch('http://localhost:3000/notes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: note.title,
                        description: note.description,
                        createdAt: note.createdAt,
                        color: note.color,
                        userId: note.userId,
                    })
                })

                if (addToNotesResponse) {
                    const deleteFromCompletedNotesResponse = await fetch(`http://localhost:3000/completedNotes/${note._id}`, {
                        method: 'DELETE'
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
        }
    }

    const handleDeleteNote = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/completedNotes/${id}`, {
                method: 'DELETE'
            })

            if (response) {
                console.log('Nota eliminada permanentemente');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error al eliminar la nota permanentemente: ', error);
        }
    }

    return (
        <div className="trash-content">
            {completedNotes.length != 0 ?
                <>
                    <div className='trash-title'>
                        <h1>Notas Completadas</h1>
                    </div>
                    <div className="completed-notes">
                        {
                            completedNotes.map(completedNote => {
                                return (
                                    <CompletedNote key={completedNote._id} id={completedNote._id} title={completedNote.title} description={completedNote.description} completedAt={completedNote.completedAt} userId={completedNote.userId} color={completedNote.color} handleRestoreNote={() => handleRestoreNote(completedNote._id)} handleDeleteNote={() => handleDeleteNote(completedNote._id)} />
                                )
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
    );
}

export default Trash;