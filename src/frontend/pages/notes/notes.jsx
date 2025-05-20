import './notes.css';

import Note from '../../components/note/note.jsx';

import AddIcon from '../../assets/add-icon.svg';

function Notes() {

  const notes = [
    {
      "createdAt": "19-04-2025",
      "title": "Alimentar a Mininio Cochinito",
      "description": "Recordar: si no hay Whiskas, alimentar al minino cerdo cochinito con pedigree aunque sea de perros."
    },
    {
      "createdAt": "20-04-2025",
      "title": "Comprar leche",
      "description": "No olvidar comprar leche deslactosada para el desayuno."
    },
    {
      "createdAt": "21-04-2025",
      "title": "Revisar correo",
      "description": "Verificar si llegó el correo de la universidad sobre la inscripción."
    },
    {
      "createdAt": "22-04-2025",
      "title": "Llamar al veterinario",
      "description": "Pedir cita para la vacuna anual de Mininio Cochinitio."
    },
    {
      "createdAt": "23-04-2025",
      "title": "Estudiar para el examen",
      "description": "Repasar los temas de matemáticas y hacer ejercicios prácticos."
    }
  ]

  return (
    <div className="notes-content">
      <div className="notes-tools ">
        <input type="text" placeholder='Buscar por tìtulo...' />
        <button><img src={AddIcon} alt="add-icon" /></button>
      </div>
      <div className="notes">
        {
          notes.map(note => {
            return (
              <Note title={note.title} description={note.description} createdAt={note.createdAt} userId={note.userId} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Notes;