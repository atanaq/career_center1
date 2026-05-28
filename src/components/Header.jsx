import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchIcon, MenuIcon, CloseIcon } from './Icons';

export default function Header({ onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const navLinks = [
    { path: '/about', label: 'О нас' },
    { path: '/professions', label: 'Направления' },
    { path: '/practice', label: 'Практика' },
    { path: '/employers', label: 'Работодателям' },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo">
            <div className="logo-icon">М</div>
            <span className="logo-text">МАДК им. Николаева</span>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <div className="search-box-header">
              <SearchIcon />
              <input
                type="text"
                placeholder="Поиск..."
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
            <Link
              to="/practice#practice-form"
              className="btn-primary btn-header-cta"
              title="Оставить заявку на практику"
            >
              Заявка на практику
            </Link>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/practice#practice-form"
              className="btn-primary mobile-cta"
              onClick={() => setIsMenuOpen(false)}
            >
              Оставить заявку на практику
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
