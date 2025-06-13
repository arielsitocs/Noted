import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../backend/context/authContext.jsx';

import './notes.css';

import Note from '../../components/note/note.jsx';
import CreateNote from '../../components/create-note/create-note.jsx';
import UpdateNote from '../../components/update-note/update-note.jsx';
import Loader from '../../components/loader/loader.jsx';

import AddIcon from '../../assets/add-icon.svg';
import SadFace from '../../assets/sad-icon.svg';

function Notes() {

  const { user } = useContext(AuthContext);

  const [notes, setNotes] = useState([]);
  const [noteToUpdate, setNoteToUpdate] = useState({});
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [isUpdateNoteOpen, setIsUpdateNoteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Funcion para traer todas las notas de la BD al cargar la pagina //
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error al cargar las notas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Encuentra la nota a actualizar por su id, actualiza el hook de noteToUpdate con los datos encontrados, y abre el modal de actualizacion  //
  const findUpdateNote = (id) => {
    const note = notes.find((note) => note._id == id);

    if (note) {
      setNoteToUpdate(note);
      setIsUpdateNoteOpen(true);
    } else {
      console.error('Nota no encontrada');
    }
  }

  // Encuentra la nota que se ha completado por id, y agrega esta nota a la tabla de notas completadas //
  // Luego elimina la misma nota de la tabla de notas base //
  const handleCompleteNote = async (id) => {
    try {
      const note = notes.find((note) => note._id === id);

      if (note) {
        const addToCompletedNotesResponse = await fetch(`${import.meta.env.VITE_API_URL}/completedNotes`, {
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

        if (addToCompletedNotesResponse) {
          const deleteFromNotesResponse = await fetch(`${import.meta.env.VITE_API_URL}/notes/${note._id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          })

          if (deleteFromNotesResponse) {
            window.location.reload();
          }
        }
      }
    } catch (error) {
      console.error('Error al completar la nota: ', error);
    }
  }

  return (
    <>
      <div className="notes-content">
        <div className="notes-tools ">
          <input type="text" placeholder='Buscar por tìtulo...' />
          <button onClick={() => setIsCreateNoteOpen(true)}><img src={AddIcon} alt="add-icon" /></button>
        </div>
        {isLoading ?
          <div className="loader-container">
            <Loader status={isLoading} />
          </div>
          : notes.length != 0 ?
            <div className="notes">
              {
                notes.map(note => {
                  // Solo se muestran las notas que el usuario logueado ha creado //
                  if (String(note.userId) === String(user.id)) {
                    return (
                      <Note key={note._id} id={note._id} title={note.title} description={note.description} featured={note.featured} createdAt={note.createdAt} userId={note.userId} color={note.color} findUpdateNote={() => findUpdateNote(note._id)} handleCompleteNote={() => handleCompleteNote(note._id)} setRegisterNoteStatus={setIsUpdateNoteOpen} handleFeatureNote={() => handleFeatureNote(note._id)} />
                    )
                  }
                })
              }
            </div>
            :
            <div className="no-notes">
              <img src={SadFace} alt="sad-icon" />
              <h1>Aún no tienes notas creadas</h1>
            </div>
        }
      </div>
      <div className={isCreateNoteOpen ? 'create-note-container' : 'create-note-container-disabled'}>
        <CreateNote status={isCreateNoteOpen} setStatus={setIsCreateNoteOpen} />
      </div>
      <div className={isUpdateNoteOpen ? 'update-note-container' : 'update-note-container-disabled'}>
        <UpdateNote status={isUpdateNoteOpen} setStatus={setIsUpdateNoteOpen} note={noteToUpdate} />
      </div>

    </>
  )
}

export default Notes;