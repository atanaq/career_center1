import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import PracticeApplicationForm, { EMPTY_PRACTICE_APPLICATION } from '../components/PracticeApplicationForm';
import { buildPracticeApplicationPayload } from '../constants/practiceApplication';
import { submitPracticeApplication } from '../services/applications';
import { getApplicationSubmitErrorMessage } from '../utils/applicationErrors';
import { SearchIcon } from '../components/Icons';

const professions = [
  { id: 1, title: 'Автомеханик', emoji: '🔧', salary: 'от 45 000 ₽', category: 'technical', description: 'Практика в автосервисах и на СТО', color: 'purple' },
  { id: 2, title: 'Сварщик', emoji: '⚡', salary: 'от 55 000 ₽', category: 'technical', description: 'Практика на производственных площадках', color: 'cyan' },
  { id: 3, title: 'Электрик', emoji: '💡', salary: 'от 50 000 ₽', category: 'technical', description: 'Практика по монтажу и обслуживанию оборудования', color: 'green' },
  { id: 4, title: 'Слесарь', emoji: '🔩', salary: 'от 42 000 ₽', category: 'technical', description: 'Практика в ремонтных и механических цехах', color: 'pink' },
  { id: 5, title: 'Каменщик', emoji: '🧱', salary: 'от 48 000 ₽', category: 'construction', description: 'Практика на строительных объектах', color: 'orange' },
  { id: 6, title: 'Маляр-штукатур', emoji: '🎨', salary: 'от 40 000 ₽', category: 'construction', description: 'Практика в отделочных бригадах', color: 'purple' },
  { id: 7, title: 'Системный администратор', emoji: '💻', salary: 'от 60 000 ₽', category: 'it', description: 'Практика в IT-отделах компаний', color: 'cyan' },
  { id: 8, title: 'Техник ПО', emoji: '🖥️', salary: 'от 55 000 ₽', category: 'it', description: 'Практика по сопровождению программных продуктов', color: 'green' },
];

const categories = [
  { id: 'all', name: 'Все направления' },
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
  const [formData, setFormData] = useState({ ...EMPTY_PRACTICE_APPLICATION });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const filteredProfessions = professions.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApply = (profession) => {
    setSelectedProfession(profession);
    setSubmitError('');
    setFormData({
      ...EMPTY_PRACTICE_APPLICATION,
      studySpecialty: profession.title,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = buildPracticeApplicationPayload(formData, {
        source: 'professions-page',
        profession: selectedProfession?.title,
        professionId: selectedProfession?.id,
      });
      await submitPracticeApplication(payload);
      setShowModal(false);
      setShowSuccessModal(true);
      setFormData({ ...EMPTY_PRACTICE_APPLICATION });
    } catch (error) {
      setSubmitError(getApplicationSubmitErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Практика</span>
          <h1 className="page-hero-title">
            <span className="gradient-text">Направления практики</span> с трудоустройством
          </h1>
          <p className="page-hero-subtitle">
            Выберите профессию и оставьте заявку на практику — данные поступят в админ-панель центра
          </p>
        </div>
      </section>

      <section className="professions-filters">
        <div className="container">
          <div className="filters-row">
            <div className="categories-list">
              {categories.map((cat) => (
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
                placeholder="Поиск направления..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

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
                  <button className="btn-apply" onClick={() => handleApply(profession)}>
                    Оставить заявку на практику
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <SearchIcon />
              <p>Направления не найдены</p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {showModal && (
        <Modal onClose={() => setShowModal(false)} variant="form">
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
              formData={formData}
              onChange={setFormData}
              onSubmit={handleSubmit}
              submitLabel="Оставить заявку на практику"
              showProfessionField
              professionTitle={selectedProfession?.title}
              compact
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          </div>
        </Modal>
      )}

      {showSuccessModal && (
        <Modal onClose={() => setShowSuccessModal(false)}>
          <div className="success-modal">
            <h3>Заявка на практику отправлена!</h3>
            <p>Администратор свяжется с вами для согласования места и сроков практики</p>
          </div>
        </Modal>
      )}
    </>
  );
}
