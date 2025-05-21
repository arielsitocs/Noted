import './create-note.scss'

function CreateNote() {
    return(
        <div className="create-note-modal">
            <div className="top-row">
                <h1>Color de la Nota</h1>
                // **TODO: Hacer selector de colores aqui //
            </div>
            <div className="middle-row">
                <div className="note-title">
                    <h1>Título</h1>
                    <input type="text" placeholder='Ej: Alimenar a Renato' />
                </div>
                <div className="note-description">
                    <h1>Descripción (opcional)</h1>
                    <input type="text" placeholder='Ej: No alimentar con pedigree, le ultima vez se intoxicó!' />
                </div>
            </div>
            <div className="bottom-row">
                <button>CREAR</button>
                <button>CANCELAR</button>
            </div>
        </div>
    )
}

export default CreateNote;