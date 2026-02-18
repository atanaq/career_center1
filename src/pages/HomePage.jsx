import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { SearchIcon, CheckIcon, PhoneIcon, RocketIcon, UsersIcon, TrophyIcon, StarIcon, BriefcaseIcon, GearIcon, ShieldIcon, DocumentIcon } from '../components/Icons';

const professions = [
  { id: 1, title: 'Автомеханик', emoji: '🔧', salary: 'от 45 000 ₽', color: 'purple' },
  { id: 2, title: 'Сварщик', emoji: '⚡', salary: 'от 55 000 ₽', color: 'cyan' },
  { id: 3, title: 'Электрик', emoji: '💡', salary: 'от 50 000 ₽', color: 'green' },
  { id: 4, title: 'Слесарь', emoji: '🔩', salary: 'от 42 000 ₽', color: 'pink' },
];

const benefits = [
  { icon: <TrophyIcon />, title: '100% трудоустройство', text: 'Гарантируем работу каждому выпускнику', color: 'purple' },
  { icon: <StarIcon />, title: 'Отличные отзывы', text: 'Более 500 положительных откликов', color: 'pink' },
  { icon: <RocketIcon />, title: 'Карьерный рост', text: 'Долгосрочные перспективы развития', color: 'cyan' },
  { icon: <BriefcaseIcon />, title: 'Достойная зарплата', text: 'Конкурентные условия оплаты', color: 'green' },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [applicationFormData, setApplicationFormData] = useState({ name: '', phone: '', email: '' });

  const filteredProfessions = professions.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Заявка отправлена:', formData);
    setShowModal(true);
    setFormData({ name: '', phone: '' });
  };

  const handleProfessionApply = (profession) => {
    setSelectedProfession(profession);
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    console.log('Заявка на профессию:', selectedProfession?.title, applicationFormData);
    setShowApplicationModal(false);
    setShowModal(true);
    setApplicationFormData({ name: '', phone: '', email: '' });
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 1) return numbers.length === 1 ? `+7 (${numbers}` : '';
    if (numbers.length <= 4) return `+7 (${numbers.slice(1)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  return (
    <>
      <Header onSearch={setSearchQuery} />

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-layout">
            <div className="hero-main">
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                Онлайн-консультация доступна
              </div>
              
              <h1 className="hero-title">
                <span className="hero-title-gradient">Центр содействия</span>
                <br />трудоустройству
              </h1>
              
              <p className="hero-description">
                Заменили ручной учёт на умную автоматизацию. 
                Полная прозрачность трудоустройства для студентов и партнёров.
              </p>

              <div className="hero-cta-row">
                <button className="btn-primary btn-large" onClick={() => document.getElementById('application').scrollIntoView({ behavior: 'smooth' })}>
                  Оставить заявку
                </button>
                <div className="hero-phone-inline">
                  <PhoneIcon />
                  <span>+7 (XXX) XXX-XX-XX</span>
                </div>
              </div>
            </div>

            <div className="hero-sidebar">
              <div className="stat-mini-card">
                <div className="stat-mini-icon purple"><UsersIcon /></div>
                <div className="stat-mini-content">
                  <strong>1200+</strong>
                  <span>Выпускников</span>
                </div>
              </div>
              <div className="stat-mini-card">
                <div className="stat-mini-icon cyan"><BriefcaseIcon /></div>
                <div className="stat-mini-content">
                  <strong>50+</strong>
                  <span>Партнёров</span>
                </div>
              </div>
              <div className="stat-mini-card">
                <div className="stat-mini-icon green"><TrophyIcon /></div>
                <div className="stat-mini-content">
                  <strong>98%</strong>
                  <span>Трудоустроено</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="benefits-strip" id="benefits">
        <div className="container">
          <div className="benefits-strip-inner">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-strip-item">
                <div className={`benefit-strip-icon ${benefit.color}`}>
                  {benefit.icon}
                </div>
                <div className="benefit-strip-text">
                  <strong>{benefit.title}</strong>
                  <span>{benefit.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРОФЕССИИ */}
      <section className="professions-section" id="professions">
        <div className="container">
          <div className="professions-header">
            <div className="professions-title-block">
              <span className="section-label">Вакансии</span>
              <h2>Подай заявку на работу по профессии</h2>
            </div>
            <div className="professions-search-inline">
              <SearchIcon />
              <input
                type="text"
                placeholder="Найти профессию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredProfessions.length > 0 ? (
            <div className="professions-grid-2x2">
              {filteredProfessions.map((profession) => (
                <div key={profession.id} className={`profession-card-large ${profession.color}`}>
                  <div className="profession-card-emoji">{profession.emoji}</div>
                  <div className="profession-card-info">
                    <h3>{profession.title}</h3>
                    <span className="profession-card-salary">{profession.salary}</span>
                  </div>
                  <button 
                    className="profession-card-btn"
                    onClick={() => handleProfessionApply(profession)}
                  >
                    Подать заявку
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <SearchIcon />
              <p>Профессия не найдена</p>
            </div>
          )}
        </div>
      </section>

      {/* АВТОМАТИЗАЦИЯ */}
      <section className="automation-section">
        <div className="container">
          <div className="automation-card">
            <div className="automation-icon">
              <GearIcon />
            </div>
            <div className="automation-content">
              <h3>Умная система обработки заявок</h3>
              <p>Данные сохраняются в базе, документы формируются автоматически. Никаких таблиц Excel — только современные технологии.</p>
            </div>
            <div className="automation-features">
              <div className="automation-feature">
                <CheckIcon />
                <span>Мгновенная обработка</span>
              </div>
              <div className="automation-feature">
                <DocumentIcon />
                <span>Автогенерация документов</span>
              </div>
              <div className="automation-feature">
                <ShieldIcon />
                <span>Защита данных</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ФОРМА ЗАЯВКИ */}
      <section className="application-section" id="application">
        <div className="container">
          <div className="application-wrapper">
            <div className="application-info">
              <span className="section-label">Консультация</span>
              <h2>Оставь заявку на онлайн-консультацию</h2>
              <p>Заполни форму и наш специалист свяжется с тобой в течение рабочего дня</p>
              
              <div className="application-benefits">
                <div className="application-benefit">
                  <CheckIcon />
                  <span>Бесплатная консультация</span>
                </div>
                <div className="application-benefit">
                  <CheckIcon />
                  <span>Помощь в выборе профессии</span>
                </div>
                <div className="application-benefit">
                  <CheckIcon />
                  <span>Связь с работодателями</span>
                </div>
              </div>
            </div>

            <form className="application-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Ваше имя</label>
                <input
                  type="text"
                  placeholder="Введите имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Номер телефона</label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                  required
                />
              </div>
              <button type="submit" className="form-submit">Отправить заявку</button>
              <p className="form-note">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </form>
          </div>
        </div>
      </section>

      <Footer />

      {/* Модальное окно успеха */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="success-modal">
            <div className="success-icon">
              <CheckIcon />
            </div>
            <h3>Заявка отправлена!</h3>
            <p>Мы сформируем документы и свяжемся с вами в ближайшее время</p>
          </div>
        </Modal>
      )}

      {/* Модальное окно заявки на профессию */}
      {showApplicationModal && (
        <Modal onClose={() => setShowApplicationModal(false)}>
          <div className="application-modal">
            <h3>Заявка на профессию</h3>
            <div className="selected-profession">
              <span className="profession-emoji-modal">{selectedProfession?.emoji}</span>
              <div>
                <strong>{selectedProfession?.title}</strong>
                <span>{selectedProfession?.salary}</span>
              </div>
            </div>
            <form onSubmit={handleApplicationSubmit}>
              <div className="form-group">
                <label>Ваше имя</label>
                <input
                  type="text"
                  placeholder="Введите имя"
                  value={applicationFormData.name}
                  onChange={(e) => setApplicationFormData({ ...applicationFormData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="example@mail.ru"
                  value={applicationFormData.email}
                  onChange={(e) => setApplicationFormData({ ...applicationFormData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Телефон</label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={applicationFormData.phone}
                  onChange={(e) => setApplicationFormData({ ...applicationFormData, phone: formatPhone(e.target.value) })}
                  required
                />
              </div>
              <button type="submit" className="form-submit">Отправить заявку</button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
