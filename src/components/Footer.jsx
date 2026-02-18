import { Link } from 'react-router-dom';
import { PhoneIcon, MailIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <div className="logo-icon">М</div>
              <span className="logo-text">МАДК им. Николаева</span>
            </Link>
            <p className="footer-description">
              Центр содействия трудоустройству выпускников колледжа
            </p>
          </div>

          <div className="footer-nav">
            <h4>Навигация</h4>
            <Link to="/about">О нас</Link>
            <Link to="/professions">Профессии</Link>
            <Link to="/consultation">Консультация</Link>
            <Link to="/employers">Работодателям</Link>
          </div>

          <div className="footer-contacts">
            <h4>Контакты</h4>
            <a href="tel:+7XXXXXXXXXX" className="footer-contact">
              <PhoneIcon />
              <span>+7 (XXX) XXX-XX-XX</span>
            </a>
            <a href="mailto:career@madk.ru" className="footer-contact">
              <MailIcon />
              <span>career@madk.ru</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} МАДК им. Николаева. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
