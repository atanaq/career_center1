import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import PracticeApplicationForm, { EMPTY_PRACTICE_APPLICATION } from '../components/PracticeApplicationForm';
import { buildPracticeApplicationPayload } from '../constants/practiceApplication';
import { submitPracticeApplication } from '../services/applications';
import { getApplicationSubmitErrorMessage } from '../utils/applicationErrors';
import { SearchIcon, CheckIcon, PhoneIcon, RocketIcon, UsersIcon, TrophyIcon, StarIcon, BriefcaseIcon, GearIcon, ShieldIcon, DocumentIcon } from '../components/Icons';

const professions = [
  { id: 1, title: 'Автомеханик', emoji: '🔧', salary: 'от 45 000 ₽', color: 'purple' },
  { id: 2, title: 'Сварщик', emoji: '⚡', salary: 'от 55 000 ₽', color: 'cyan' },
  { id: 3, title: 'Электрик', emoji: '💡', salary: 'от 50 000 ₽', color: 'green' },
  { id: 4, title: 'Слесарь', emoji: '🔩', salary: 'от 42 000 ₽', color: 'pink' },
];

const benefits = [
  { icon: <TrophyIcon />, title: 'Практика с трудоустройством', text: 'Сопровождаем от практики до официального трудоустройства', color: 'purple' },
  { icon: <BriefcaseIcon />, title: 'Предприятия-партнёры', text: 'Практика на реальных производствах и в сервисах', color: 'cyan' },
  { icon: <StarIcon />, title: 'Куратор практики', text: 'Персональная поддержка на всех этапах', color: 'pink' },
  { icon: <RocketIcon />, title: 'Карьерный рост', text: 'Помогаем закрепиться на рабочем месте после практики', color: 'green' },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [formData, setFormData] = useState({ ...EMPTY_PRACTICE_APPLICATION });
  const [applicationFormData, setApplicationFormData] = useState({ ...EMPTY_PRACTICE_APPLICATION });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalSubmitting, setIsModalSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [modalSubmitError, setModalSubmitError] = useState('');

  const filteredProfessions = professions.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = buildPracticeApplicationPayload(formData, { source: 'home-main-form' });
      await submitPracticeApplication(payload);
      setShowModal(true);
      setFormData({ ...EMPTY_PRACTICE_APPLICATION });
    } catch (error) {
      setSubmitError(getApplicationSubmitErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfessionApply = (profession) => {
    setSelectedProfession(profession);
    setModalSubmitError('');
    setApplicationFormData({
      ...EMPTY_PRACTICE_APPLICATION,
      studySpecialty: profession.title,
    });
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setIsModalSubmitting(true);
    setModalSubmitError('');

    try {
      const payload = buildPracticeApplicationPayload(applicationFormData, {
        source: 'home-profession-modal',
        profession: selectedProfession?.title,
        professionId: selectedProfession?.id,
      });
      await submitPracticeApplication(payload);
      setShowApplicationModal(false);
      setShowModal(true);
      setApplicationFormData({ ...EMPTY_PRACTICE_APPLICATION });
    } catch (error) {
      setModalSubmitError(getApplicationSubmitErrorMessage(error));
    } finally {
      setIsModalSubmitting(false);
    }
  };

  return (
    <>
      <Header onSearch={setSearchQuery} />

      <section className="hero">
        <div className="container">
          <div className="hero-layout">
            <div className="hero-main">
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                Запись на производственную практику открыта
              </div>

              <h1 className="hero-title">
                <span className="hero-title-gradient">Практика</span>
                <br />
                с трудоустройством
              </h1>

              <p className="hero-description">
                Центр содействия трудоустройству МАДК им. Николаева: прохождение практики
                на предприятиях-партнёрах, сопровождение и помощь в трудоустройстве после
                обучения.
              </p>

              <div className="hero-cta-row">
                <button
                  className="btn-primary btn-large"
                  onClick={() =>
                    document.getElementById('application').scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Оставить заявку на практику
                </button>
                <div className="hero-phone-inline">
                  <PhoneIcon />
                  <span>+7 (XXX) XXX-XX-XX</span>
                </div>
              </div>
            </div>

            <div className="hero-sidebar">
              <div className="stat-mini-card">
                <div className="stat-mini-icon purple">
                  <UsersIcon />
                </div>
                <div className="stat-mini-content">
                  <strong>1200+</strong>
                  <span>Прошли практику</span>
                </div>
              </div>
              <div className="stat-mini-card">
                <div className="stat-mini-icon cyan">
                  <BriefcaseIcon />
                </div>
                <div className="stat-mini-content">
                  <strong>50+</strong>
                  <span>Баз практики</span>
                </div>
              </div>
              <div className="stat-mini-card">
                <div className="stat-mini-icon green">
                  <TrophyIcon />
                </div>
                <div className="stat-mini-content">
                  <strong>98%</strong>
                  <span>Трудоустроено</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-strip" id="benefits">
        <div className="container">
          <div className="benefits-strip-inner">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-strip-item">
                <div className={`benefit-strip-icon ${benefit.color}`}>{benefit.icon}</div>
                <div className="benefit-strip-text">
                  <strong>{benefit.title}</strong>
                  <span>{benefit.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="professions-section" id="professions">
        <div className="container">
          <div className="professions-header">
            <div className="professions-title-block">
              <span className="section-label">Направления</span>
              <h2>Выберите направление практики</h2>
            </div>
            <div className="professions-search-inline">
              <SearchIcon />
              <input
                type="text"
                placeholder="Найти направление..."
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
                    Оставить заявку на практику
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <SearchIcon />
              <p>Направление не найдено</p>
            </div>
          )}
        </div>
      </section>

      <section className="automation-section">
        <div className="container">
          <div className="automation-card">
            <div className="automation-icon">
              <GearIcon />
            </div>
            <div className="automation-content">
              <h3>Учёт практикантов в админ-панели</h3>
              <p>
                Заявки с сайта автоматически попадают в десктопную админку: ФИО, группа,
                направление, формат и сроки практики — всё в одном месте для координаторов.
              </p>
            </div>
            <div className="automation-features">
              <div className="automation-feature">
                <CheckIcon />
                <span>Распределение по базам</span>
              </div>
              <div className="automation-feature">
                <DocumentIcon />
                <span>Документы по практике</span>
              </div>
              <div className="automation-feature">
                <ShieldIcon />
                <span>Защита данных</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="application-section" id="application">
        <div className="container">
          <div className="application-wrapper application-wrapper--wide">
            <div className="application-info">
              <span className="section-label">Практика</span>
              <h2>Записаться на практику</h2>
              <p>
                Заполните подробную анкету — данные сразу будут доступны администратору в
                десктопной панели
              </p>

              <div className="application-benefits">
                <div className="application-benefit">
                  <CheckIcon />
                  <span>Практика с трудоустройством</span>
                </div>
                <div className="application-benefit">
                  <CheckIcon />
                  <span>Подбор предприятия под профиль</span>
                </div>
                <div className="application-benefit">
                  <CheckIcon />
                  <span>Сопровождение куратора</span>
                </div>
              </div>
            </div>

            <div className="application-form-panel">
              <PracticeApplicationForm
                formData={formData}
                onChange={setFormData}
                onSubmit={handleSubmit}
                submitLabel="Записаться на практику"
                compact
                isSubmitting={isSubmitting}
                submitError={submitError}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="success-modal">
            <h3>Заявка на практику отправлена!</h3>
            <p>Администратор получил ваши данные и свяжется с вами для согласования практики</p>
          </div>
        </Modal>
      )}

      {showApplicationModal && (
        <Modal onClose={() => setShowApplicationModal(false)} variant="form">
          <div className="application-modal">
            <h3>Заявка на практику</h3>
            <div className="selected-profession">
              <span className="profession-emoji-modal">{selectedProfession?.emoji}</span>
              <div>
                <strong>{selectedProfession?.title}</strong>
                <span>{selectedProfession?.salary}</span>
              </div>
            </div>
            <PracticeApplicationForm
              formData={applicationFormData}
              onChange={setApplicationFormData}
              onSubmit={handleApplicationSubmit}
              submitLabel="Оставить заявку на практику"
              showProfessionField
              professionTitle={selectedProfession?.title}
              compact
              isSubmitting={isModalSubmitting}
              submitError={modalSubmitError}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
