import './loader.css';

function Loader({ status, width, height }) {
    if (status)
        return (
            <div className="loader">
                <div className="spinner" style={{width: width, height: height}}></div>
            </div>
        )
}

export default Loader;