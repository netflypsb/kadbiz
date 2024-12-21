import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import CardEditor from './pages/CardEditor';
import PublicCard from './pages/PublicCard';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<CardEditor />} />
          <Route path="/editor/:id" element={<CardEditor />} />
          <Route path="/card/:publicUrl" element={<PublicCard />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;