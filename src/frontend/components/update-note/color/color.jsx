import './color.css'

function Color({ color, handleNoteColor }) {
    return (
        <div className="color" style={{ backgroundColor: color }} onClick={handleNoteColor}></div>
    )
}

export default Color;