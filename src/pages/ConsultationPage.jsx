import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { CheckIcon, PhoneIcon, UsersIcon, DocumentIcon, RocketIcon } from '../components/Icons';

const consultationTypes = [
  {
    icon: <UsersIcon />,
    title: 'Карьерная консультация',
    description: 'Поможем определиться с направлением профессионального развития',
    duration: '30 мин',
    color: 'purple'
  },
  {
    icon: <DocumentIcon />,
    title: 'Помощь с резюме',
    description: 'Составим или улучшим ваше резюме для успешного трудоустройства',
    duration: '45 мин',
    color: 'cyan'
  },
  {
    icon: <RocketIcon />,
    title: 'Подготовка к собеседованию',
    description: 'Проведём тренировочное собеседование и дадим рекомендации',
    duration: '60 мин',
    color: 'green'
  },
  {
    icon: <PhoneIcon />,
    title: 'Экспресс-консультация',
    description: 'Быстрые ответы на ваши вопросы по трудоустройству',
    duration: '15 мин',
    color: 'pink'
  }
];

const steps = [
  { number: '01', title: 'Оставьте заявку', description: 'Заполните форму на сайте' },
  { number: '02', title: 'Подтверждение', description: 'Мы свяжемся для подтверждения времени' },
  { number: '03', title: 'Консультация', description: 'Проведём онлайн-встречу' },
  { number: '04', title: 'Результат', description: 'Получите план действий' }
];

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: '',
    message: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 1) return numbers.length === 1 ? `+7 (${numbers}` : '';
    if (numbers.length <= 4) return `+7 (${numbers.slice(1)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Заявка на консультацию:', formData);
    setShowSuccessModal(true);
    setFormData({ name: '', phone: '', email: '', type: '', message: '' });
  };

  return (
    <>
      <Header />

      {/* Hero секция */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Консультация</span>
          <h1 className="page-hero-title">
            <span className="gradient-text">Онлайн-консультация</span> по трудоустройству
          </h1>
          <p className="page-hero-subtitle">
            Получите профессиональную помощь в поиске работы и развитии карьеры
          </p>
        </div>
      </section>

      {/* Виды консультаций */}
      <section className="consultation-types">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Услуги</span>
            <h2>Виды консультаций</h2>
          </div>

          <div className="consultation-grid">
            {consultationTypes.map((type, index) => (
              <div key={index} className={`consultation-card ${type.color}`}>
                <div className="consultation-card-icon">{type.icon}</div>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
                <div className="consultation-duration">
                  <span>⏱️ {type.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как проходит консультация */}
      <section className="consultation-steps">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Процесс</span>
            <h2>Как записаться на консультацию</h2>
          </div>

          <div className="steps-horizontal">
            {steps.map((step, index) => (
              <div key={index} className="step-item">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {index < steps.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Форма записи */}
      <section className="consultation-form-section">
        <div className="container">
          <div className="consultation-form-wrapper">
            <div className="consultation-form-info">
              <span className="section-label">Запись</span>
              <h2>Записаться на консультацию</h2>
              <p>Заполните форму и мы свяжемся с вами для подтверждения времени консультации</p>
              
              <div className="consultation-benefits">
                <div className="consultation-benefit">
                  <CheckIcon />
                  <span>Бесплатная первая консультация</span>
                </div>
                <div className="consultation-benefit">
                  <CheckIcon />
                  <span>Опытные консультанты</span>
                </div>
                <div className="consultation-benefit">
                  <CheckIcon />
                  <span>Онлайн или очно</span>
                </div>
                <div className="consultation-benefit">
                  <CheckIcon />
                  <span>Гибкий график</span>
                </div>
              </div>
            </div>

            <form className="consultation-form" onSubmit={handleSubmit}>
              <div className="form-row">
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
              </div>
              <div className="form-row">
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
                <div className="form-group">
                  <label>Тип консультации</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                  >
                    <option value="">Выберите тип</option>
                    <option value="career">Карьерная консультация</option>
                    <option value="resume">Помощь с резюме</option>
                    <option value="interview">Подготовка к собеседованию</option>
                    <option value="express">Экспресс-консультация</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Сообщение (необязательно)</label>
                <textarea
                  placeholder="Опишите ваш вопрос или ситуацию..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="form-submit">Записаться на консультацию</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />

      {/* Модальное окно успеха */}
      {showSuccessModal && (
        <Modal onClose={() => setShowSuccessModal(false)}>
          <div className="success-modal">
            <div className="success-icon">
              <CheckIcon />
            </div>
            <h3>Заявка отправлена!</h3>
            <p>Мы свяжемся с вами в ближайшее время для подтверждения времени консультации</p>
          </div>
        </Modal>
      )}
    </>
  );
}
