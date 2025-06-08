import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../backend/context/authContext.jsx'

import './index.css'

import NavBar from './components/nav-bar/nav-bar.jsx';
import Notes from './pages/notes/notes.jsx';
import Featured from './pages/featured/featured.jsx';
import Trash from './pages/trash/trash.jsx';
import Home from './pages/home/home.jsx';
import ProtectedRoute from './components/protected-route/protectedRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path='home' element={<Home />} />
            <Route path='notes' element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            } />
            <Route path="featured" element={
              <ProtectedRoute>
                <Featured />
              </ProtectedRoute>
            } />
            <Route path="trash" element={
              <ProtectedRoute>
                <Trash />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter >
    </AuthProvider>
  </StrictMode>
)
