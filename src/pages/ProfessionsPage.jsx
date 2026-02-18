import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { SearchIcon, CheckIcon } from '../components/Icons';

const professions = [
  { id: 1, title: 'Автомеханик', emoji: '🔧', salary: 'от 45 000 ₽', category: 'technical', description: 'Диагностика, ремонт и обслуживание автомобилей', color: 'purple' },
  { id: 2, title: 'Сварщик', emoji: '⚡', salary: 'от 55 000 ₽', category: 'technical', description: 'Сварочные работы различной сложности', color: 'cyan' },
  { id: 3, title: 'Электрик', emoji: '💡', salary: 'от 50 000 ₽', category: 'technical', description: 'Монтаж и обслуживание электрооборудования', color: 'green' },
  { id: 4, title: 'Слесарь', emoji: '🔩', salary: 'от 42 000 ₽', category: 'technical', description: 'Слесарные и ремонтные работы', color: 'pink' },
  { id: 5, title: 'Каменщик', emoji: '🧱', salary: 'от 48 000 ₽', category: 'construction', description: 'Кладка кирпича и строительных блоков', color: 'orange' },
  { id: 6, title: 'Маляр-штукатур', emoji: '🎨', salary: 'от 40 000 ₽', category: 'construction', description: 'Отделочные работы, покраска, штукатурка', color: 'purple' },
  { id: 7, title: 'Системный администратор', emoji: '💻', salary: 'от 60 000 ₽', category: 'it', description: 'Обслуживание компьютерных сетей и систем', color: 'cyan' },
  { id: 8, title: 'Техник ПО', emoji: '🖥️', salary: 'от 55 000 ₽', category: 'it', description: 'Установка и настройка программного обеспечения', color: 'green' },
];

const categories = [
  { id: 'all', name: 'Все профессии' },
  { id: 'technical', name: 'Технические' },
  { id: 'construction', name: 'Строительные' },
  { id: 'it', name: 'IT-специальности' },
];

export default function ProfessionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  const filteredProfessions = professions.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 1) return numbers.length === 1 ? `+7 (${numbers}` : '';
    if (numbers.length <= 4) return `+7 (${numbers.slice(1)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handleApply = (profession) => {
    setSelectedProfession(profession);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Заявка на профессию:', selectedProfession?.title, formData);
    setShowModal(false);
    setShowSuccessModal(true);
    setFormData({ name: '', phone: '', email: '' });
  };

  return (
    <>
      <Header />

      {/* Hero секция */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Вакансии</span>
          <h1 className="page-hero-title">
            <span className="gradient-text">Профессии</span> для трудоустройства
          </h1>
          <p className="page-hero-subtitle">
            Выберите интересующую профессию и подайте заявку на трудоустройство
          </p>
        </div>
      </section>

      {/* Фильтры и поиск */}
      <section className="professions-filters">
        <div className="container">
          <div className="filters-row">
            <div className="categories-list">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="search-box">
              <SearchIcon />
              <input
                type="text"
                placeholder="Поиск профессии..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Список профессий */}
      <section className="professions-list">
        <div className="container">
          {filteredProfessions.length > 0 ? (
            <div className="professions-grid-3">
              {filteredProfessions.map((profession) => (
                <div key={profession.id} className={`profession-card-full ${profession.color}`}>
                  <div className="profession-card-header">
                    <span className="profession-emoji-large">{profession.emoji}</span>
                    <span className="profession-salary-badge">{profession.salary}</span>
                  </div>
                  <h3>{profession.title}</h3>
                  <p>{profession.description}</p>
                  <button 
                    className="btn-apply"
                    onClick={() => handleApply(profession)}
                  >
                    Подать заявку
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <SearchIcon />
              <p>Профессии не найдены</p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Модальное окно формы заявки */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="application-modal">
            <h3>Заявка на профессию</h3>
            <div className="selected-profession">
              <span className="profession-emoji-modal">{selectedProfession?.emoji}</span>
              <div>
                <strong>{selectedProfession?.title}</strong>
                <span>{selectedProfession?.salary}</span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
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
                <label>Email</label>
                <input
                  type="email"
                  placeholder="example@mail.ru"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Телефон</label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                  required
                />
              </div>
              <button type="submit" className="form-submit">Отправить заявку</button>
            </form>
          </div>
        </Modal>
      )}

      {/* Модальное окно успеха */}
      {showSuccessModal && (
        <Modal onClose={() => setShowSuccessModal(false)}>
          <div className="success-modal">
            <div className="success-icon">
              <CheckIcon />
            </div>
            <h3>Заявка отправлена!</h3>
            <p>Мы свяжемся с вами в ближайшее время для уточнения деталей</p>
          </div>
        </Modal>
      )}
    </>
  );
}
