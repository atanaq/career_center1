import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { CheckIcon, UsersIcon, BriefcaseIcon, TrophyIcon, BuildingIcon, HandshakeIcon, ChartIcon, ClockIcon, TargetIcon, DocumentIcon } from '../components/Icons';

const partnerBenefits = [
  { icon: <UsersIcon />, title: 'Квалифицированные кадры', text: 'Доступ к базе подготовленных специалистов' },
  { icon: <ClockIcon />, title: 'Экономия времени', text: 'Быстрый подбор кандидатов под ваши требования' },
  { icon: <HandshakeIcon />, title: 'Гибкое сотрудничество', text: 'Индивидуальный подход к каждому партнёру' },
  { icon: <ChartIcon />, title: 'Аналитика и отчёты', text: 'Прозрачная статистика по всем процессам' },
  { icon: <TargetIcon />, title: 'Целевая подготовка', text: 'Обучение студентов под ваши задачи' },
  { icon: <DocumentIcon />, title: 'Простое оформление', text: 'Минимум бюрократии, максимум результата' },
];

export default function EmployersPage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    vacancy: '',
    requirements: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Заявка работодателя:', formData);
    setShowModal(true);
    setFormData({ company: '', contact: '', email: '', phone: '', vacancy: '', requirements: '' });
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
      <Header />

      {/* HERO для работодателей */}
      <section className="employers-hero-section">
        <div className="container">
          <div className="employers-hero-content">
            <span className="section-label">Для работодателей</span>
            <h1>Найдите лучших <span className="text-gradient">специалистов</span></h1>
            <p>Сотрудничайте с нами и получите доступ к базе квалифицированных выпускников колледжа</p>
            
            <div className="employers-hero-stats">
              <div className="employers-stat">
                <strong>1200+</strong>
                <span>Выпускников</span>
              </div>
              <div className="employers-stat-divider"></div>
              <div className="employers-stat">
                <strong>50+</strong>
                <span>Партнёров</span>
              </div>
              <div className="employers-stat-divider"></div>
              <div className="employers-stat">
                <strong>15</strong>
                <span>Специальностей</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества партнёрства - сетка 3x2 */}
      <section className="partner-benefits">
        <div className="container">
          <div className="section-header-left">
            <span className="section-label">Почему мы</span>
            <h2>Преимущества сотрудничества</h2>
          </div>
          
          <div className="partner-benefits-grid">
            {partnerBenefits.map((benefit, index) => (
              <div key={index} className="partner-benefit-card">
                <div className="partner-benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как начать сотрудничество - timeline */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Процесс</span>
            <h2>Как начать сотрудничество</h2>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-number">01</div>
              <div className="timeline-content">
                <h3>Оставьте заявку</h3>
                <p>Заполните форму с информацией о компании и требованиях к кандидатам</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-item">
              <div className="timeline-number">02</div>
              <div className="timeline-content">
                <h3>Обсуждение</h3>
                <p>Наш специалист свяжется с вами для уточнения деталей</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-item">
              <div className="timeline-number">03</div>
              <div className="timeline-content">
                <h3>Подбор кандидатов</h3>
                <p>Подберём подходящих специалистов из нашей базы выпускников</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-item">
              <div className="timeline-number">04</div>
              <div className="timeline-content">
                <h3>Трудоустройство</h3>
                <p>Оформляем документы и сопровождаем на всех этапах</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Форма для работодателей */}
      <section className="employer-form-section" id="application">
        <div className="container">
          <div className="employer-form-wrapper">
            <div className="employer-form-info">
              <span className="section-label">Заявка</span>
              <h2>Оставьте заявку на подбор специалистов</h2>
              <p>Заполните форму и мы подберём кандидатов, соответствующих вашим требованиям</p>

              <div className="employer-form-guarantees">
                <div className="guarantee-item">
                  <CheckIcon />
                  <span>Бесплатный подбор кандидатов</span>
                </div>
                <div className="guarantee-item">
                  <CheckIcon />
                  <span>Ответ в течение 24 часов</span>
                </div>
                <div className="guarantee-item">
                  <CheckIcon />
                  <span>Полное сопровождение</span>
                </div>
              </div>
            </div>

            <form className="employer-form" onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Название компании</label>
                  <input
                    type="text"
                    placeholder="ООО «Компания»"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Контактное лицо</label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="email@company.ru"
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
              </div>
              <div className="form-group">
                <label>Вакансия / должность</label>
                <input
                  type="text"
                  placeholder="Например: Автомеханик"
                  value={formData.vacancy}
                  onChange={(e) => setFormData({ ...formData, vacancy: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Требования к кандидату</label>
                <textarea
                  placeholder="Опишите требования, условия работы и обязанности..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="form-submit">Отправить заявку</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>Заявка принята!</h3>
          <p>Наш менеджер свяжется с вами в ближайшее время для обсуждения сотрудничества</p>
        </Modal>
      )}
    </>
  );
}
