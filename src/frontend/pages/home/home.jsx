import './home.css';
import logo from '../../../../public/logo.png';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home-layout">
            <div className="home-content">
                <div className="home-hero">
                    <div className="home-logo-title">
                        <img src={logo} alt="Noted logo" className="home-logo" />
                    </div>
                    <h2 className="home-slogan">Tus ideas, organizadas y seguras.</h2>
                    <p className="home-desc">
                        Noted es tu espacio para guardar, organizar y destacar tus notas de forma simple y moderna.<br />
                        ¡Accede a tus notas desde cualquier lugar y nunca pierdas una idea importante!
                    </p>
                    <div className="home-actions">
                        <Link to="/notes" className="home-btn home-btn-main">Ir a mis notas</Link>
                        <Link to="/featured" className="home-btn">Ver destacadas</Link>
                    </div>
                </div>
                <div className="home-cards">
                    <div className="home-card home-card-purple">
                        <h3>Organiza</h3>
                        <p>Categoriza y busca tus notas fácilmente.</p>
                    </div>
                    <div className="home-card home-card-orange">
                        <h3>Destaca</h3>
                        <p>Marca tus notas más importantes para tenerlas siempre a mano.</p>
                    </div>
                    <div className="home-card home-card-red">
                        <h3>Recupera</h3>
                        <p>¿Borraste algo? ¡Recupéralo desde la papelera!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;