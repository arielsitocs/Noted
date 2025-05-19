import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'

import App from './App.jsx';
import NavBar from './components/nav-bar/nav-bar.jsx';
import Notes from './pages/notes/notes.jsx';
import Featured from './pages/featured/featured.jsx';
import Trash from './pages/trash/trash.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="notes" element={<Notes />} />
          <Route path="featured" element={<Featured />} />
          <Route path="trash" element={<Trash />} />
        </Route>
      </Routes>
    </BrowserRouter >
  </StrictMode>
)
