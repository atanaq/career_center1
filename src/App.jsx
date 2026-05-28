import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmployersPage from './pages/EmployersPage';
import AboutPage from './pages/AboutPage';
import ProfessionsPage from './pages/ProfessionsPage';
import PracticePage from './pages/PracticePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/professions" element={<ProfessionsPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/consultation" element={<Navigate to="/practice" replace />} />
        <Route path="/employers" element={<EmployersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
