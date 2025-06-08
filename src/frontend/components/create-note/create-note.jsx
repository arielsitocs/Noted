import { useState, useEffect } from 'react';

import './create-note.scss'

import Color from './color/color';
import Loader from '../loader/loader';

function CreateNote({ status, setStatus }) {

    const [noteColor, setNoteColor] = useState('#ffffff');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState('30bbbf28attrl');
    const [isLoading, setIsLoading] = useState(false);

    // Lista de colores definidos para las notas //
    const colors = [
        { id: 1, name: 'light-blue', hex: '#3388FF' },
        { id: 2, name: 'light-red', hex: '#FF3636' },
        { id: 3, name: 'light-green', hex: '#92ED80' },
        { id: 4, name: 'yellow', hex: '#FFFB82' },
        { id: 5, name: 'purple', hex: '#C466FF' },
        { id: 6, name: 'sky-blue', hex: '#85E9FF' },
        { id: 7, name: 'orange', hex: '#FF9100' },
        { id: 8, name: 'pink', hex: '#FF54F4' },
        { id: 9, name: 'white', hex: '#FFFFFF' },
        { id: 10, name: 'blue', hex: '#1100FF' }
    ];

    const handleCreateNote = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    color: noteColor,
                    userId: userId
                })
            });

            if (response) {
                const data = response.json();
                console.log(data);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error al crear la nota: ', error);
        }
    }

    // Funcion que encuentra el color clickeado por el id, y cambia el color de la nota a este mismo //
    const handleNoteColor = (id) => {
        const color = colors.find((color) => color.id === id);

        // Si el color existe, se cambia el color de la nota //
        if (color) {
            setNoteColor(color.hex);
        } else {
            console.error('Color no encontrado');
        }
    };

    if (status)
        return (
            <>
                <form className="create-note-modal" style={{ backgroundColor: noteColor }} onSubmit={handleCreateNote}>
                    <div className="top-row">
                        <h1>Color de la Nota</h1>
                        <div className="color-list">
                            {
                                colors.map((color) => {
                                    return (
                                        <Color key={color.id} color={color.hex} handleNoteColor={() => handleNoteColor(color.id)} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="middle-row">
                        <div className="note-title">
                            <h1>Título</h1>
                            <input type="text" placeholder='Ej: Alimenar a Renato' onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="note-description">
                            <h1>Descripción (opcional)</h1>
                            <textarea type="text" id='description' placeholder='Ej: No alimentar con pedigree, la ultima vez se intoxicó!' onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>
                    <div className="bottom-row">
                        <button id='create-note' type='submit'>CREAR</button>
                        <button id='cancel-note' onClick={() => setStatus(false)}>CANCELAR</button>
                    </div>
                </form>
            </>
        )
}

export default CreateNote;