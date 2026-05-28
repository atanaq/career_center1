import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import PracticeApplicationForm, { EMPTY_PRACTICE_APPLICATION } from '../components/PracticeApplicationForm';
import { buildPracticeApplicationPayload } from '../constants/practiceApplication';
import { submitPracticeApplication } from '../services/applications';
import { getApplicationSubmitErrorMessage } from '../utils/applicationErrors';
import { CheckIcon, PhoneIcon, DocumentIcon, RocketIcon, BriefcaseIcon } from '../components/Icons';

const practicePrograms = [
  {
    icon: <BriefcaseIcon />,
    title: 'Производственная практика',
    description: 'Закрепление навыков на реальном предприятии с наставником',
    duration: 'от 4 недель',
    color: 'purple',
  },
  {
    icon: <DocumentIcon />,
    title: 'Преддипломная практика',
    description: 'Подготовка к итоговой аттестации и трудоустройству',
    duration: 'от 6 недель',
    color: 'cyan',
  },
  {
    icon: <RocketIcon />,
    title: 'Практика с трудоустройством',
    description: 'Прохождение практики с перспективой официального трудоустройства',
    duration: 'индивидуально',
    color: 'green',
  },
  {
    icon: <PhoneIcon />,
    title: 'Консультация по практике',
    description: 'Поможем выбрать направление, предприятие и сроки прохождения',
    duration: '30 мин',
    color: 'pink',
  },
];

const steps = [
  { number: '01', title: 'Оставьте заявку на практику', description: 'Заполните подробную форму на сайте' },
  { number: '02', title: 'Согласование', description: 'Администратор свяжется для уточнения данных' },
  { number: '03', title: 'Распределение', description: 'Подберём предприятие и график практики' },
  { number: '04', title: 'Трудоустройство', description: 'Сопроводим до выхода на работу' },
];

export default function PracticePage() {
  const location = useLocation();
  const [formData, setFormData] = useState({ ...EMPTY_PRACTICE_APPLICATION });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (location.hash === '#practice-form') {
      document.getElementById('practice-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = buildPracticeApplicationPayload(formData, { source: 'practice-page' });
      await submitPracticeApplication(payload);
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
            <span className="gradient-text">Практика с трудоустройством</span>
          </h1>
          <p className="page-hero-subtitle">
            Проходите практику на предприятиях-партнёрах и получайте поддержку центра на пути к работе
          </p>
        </div>
      </section>

      <section className="consultation-types">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Программы</span>
            <h2>Форматы практики</h2>
          </div>

          <div className="consultation-grid">
            {practicePrograms.map((program, index) => (
              <div key={index} className={`consultation-card ${program.color}`}>
                <div className="consultation-card-icon">{program.icon}</div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <div className="consultation-duration">
                  <span>⏱️ {program.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="consultation-steps">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Процесс</span>
            <h2>Как записаться на практику</h2>
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

      <section className="consultation-form-section" id="practice-form">
        <div className="container">
          <div className="consultation-form-wrapper">
            <div className="consultation-form-info">
              <span className="section-label">Запись</span>
              <h2>Записаться на практику</h2>
              <p>
                Заполните анкету — все поля попадут в десктопную админ-панель для распределения
                и сопровождения
              </p>

              <div className="consultation-benefits">
                <div className="consultation-benefit">
                  <CheckIcon />
                  <span>Практика на проверенных предприятиях</span>
                </div>
                <div className="consultation-benefit">
                  <CheckIcon />
                  <span>Помощь в оформлении документов</span>
                </div>
                <div className="consultation-benefit">
                  <CheckIcon />
                  <span>Сопровождение до трудоустройства</span>
                </div>
                <div className="consultation-benefit">
                  <CheckIcon />
                  <span>Куратор от центра практики</span>
                </div>
              </div>
            </div>

            <PracticeApplicationForm
              formData={formData}
              onChange={setFormData}
              onSubmit={handleSubmit}
              submitLabel="Записаться на практику"
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          </div>
        </div>
      </section>

      <Footer />

      {showSuccessModal && (
        <Modal onClose={() => setShowSuccessModal(false)}>
          <div className="success-modal">
            <h3>Заявка на практику отправлена!</h3>
            <p>Данные переданы администратору. Мы свяжемся с вами для согласования практики</p>
          </div>
        </Modal>
      )}
    </>
  );
}
