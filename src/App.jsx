import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmployersPage from './pages/EmployersPage';
import AboutPage from './pages/AboutPage';
import ProfessionsPage from './pages/ProfessionsPage';
import ConsultationPage from './pages/ConsultationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/professions" element={<ProfessionsPage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/employers" element={<EmployersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
