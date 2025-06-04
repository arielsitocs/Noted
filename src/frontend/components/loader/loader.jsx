import './loader.css';

function Loader({ status }) {
    if (status)
        return (
            <div className="loader">
                <div className="spinner"></div>
            </div>
        )
}

export default Loader;