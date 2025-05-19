import MenuIcon from '../../assets/menu-icon.svg';
import MyNotesIcon from '../../assets/notes-icon.svg';
import FeaturedIcon from '../../assets/featured-icon.svg';
import TrashIcon from '../../assets/trash-icon.svg';

import './nav-bar.css';

import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NavBar() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(true);
    const [menuIconOpen, setMenuIconOpen] = useState(true);

    const handleMenuOpen = () => {
        setMenuIconOpen(!menuIconOpen);
        setMenuOpen(!menuOpen);
    }

    return (
        <>
            <div className='layout'>
                <div className="nav-bar-top">
                    <div className="top-left">
                        <img className={menuIconOpen ? 'menu-icon' : 'menu-icon-closed'} src={MenuIcon} alt="-" onClick={() => handleMenuOpen()} />
                        <div className="title" onClick={() => navigate('/notes')}>
                            <h1>N</h1><h2>oted</h2>
                        </div>
                    </div>
                    <div className="top-right">
                        <button className="login">Ingresar</button>
                        <button className="register">Registrarse</button>
                    </div>
                </div>
                <div className="side-and-content">
                    <nav className={menuOpen ? 'side-nav-bar-open' : 'side-nav-bar-closed'}>
                        <ul>
                            <li className='side-my-notes' onClick={() => navigate('/notes')}>
                                <img src={MyNotesIcon} alt="my-notes-icon" />
                                <a>Mis Notas</a>
                            </li>
                            <li className='side-featured' onClick={() => navigate('/featured')}>
                                <img src={FeaturedIcon} alt="featured-icon" />
                                <a>Destacadas</a>
                            </li>
                            <li className='side-trash' onClick={() => navigate('/trash')}>
                                <img src={TrashIcon} alt="trash-icon" />
                                <a>Papelera</a>
                            </li>
                        </ul>
                    </nav>
                    <main className="page-content">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}

export default NavBar;