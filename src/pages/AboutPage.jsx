import Header from '../components/Header';
import Footer from '../components/Footer';
import { UsersIcon, TrophyIcon, StarIcon, RocketIcon, CheckIcon } from '../components/Icons';

const values = [
  {
    icon: <UsersIcon />,
    title: 'Индивидуальный подход',
    description: 'Каждый студент получает персональное сопровождение на практике и при трудоустройстве',
    color: 'purple'
  },
  {
    icon: <TrophyIcon />,
    title: 'Качество и результат',
    description: 'Высокий процент успешного прохождения практики и трудоустройства выпускников',
    color: 'cyan'
  },
  {
    icon: <RocketIcon />,
    title: 'Современные технологии',
    description: 'Используем автоматизированные системы для быстрой и эффективной работы',
    color: 'green'
  }
];

const timeline = [
  { year: '2015', title: 'Основание центра', description: 'Создание Центра содействия трудоустройству при колледже' },
  { year: '2018', title: 'Первые 500 выпускников', description: 'Достигли отметки в 500 трудоустроенных студентов' },
  { year: '2021', title: 'Цифровизация', description: 'Запуск автоматизированной системы обработки заявок' },
  { year: '2024', title: '1200+ выпускников', description: 'Более 1200 успешно трудоустроенных специалистов' }
];

const team = [
  { name: 'Иванова Мария', position: 'Руководитель центра', emoji: '👩‍💼' },
  { name: 'Петров Алексей', position: 'Специалист по работе с партнёрами', emoji: '👨‍💻' },
  { name: 'Сидорова Елена', position: 'Карьерный консультант', emoji: '👩‍🏫' }
];

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero секция */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">О нас</span>
          <h1 className="page-hero-title">
            <span className="gradient-text">Практика</span> с трудоустройством
          </h1>
          <p className="page-hero-subtitle">
            Мы организуем производственную и преддипломную практику для студентов МАДК им. Николаева
            и сопровождаем их до трудоустройства
          </p>
        </div>
      </section>

      {/* Миссия и ценности */}
      <section className="values-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Наши ценности</span>
            <h2>Что нас отличает</h2>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className={`value-card ${value.color}`}>
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* История */}
      <section className="history-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Наш путь</span>
            <h2>История развития</h2>
          </div>

          <div className="timeline-vertical">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <span className="timeline-year">{item.year}</span>
                </div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="team-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Команда</span>
            <h2>Наши специалисты</h2>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.emoji}</div>
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Достижения */}
      <section className="achievements-section">
        <div className="container">
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-number">1200+</div>
              <div className="achievement-label">Трудоустроенных выпускников</div>
            </div>
            <div className="achievement-card">
              <div className="achievement-number">50+</div>
              <div className="achievement-label">Компаний-партнёров</div>
            </div>
            <div className="achievement-card">
              <div className="achievement-number">98%</div>
              <div className="achievement-label">Успешное трудоустройство</div>
            </div>
            <div className="achievement-card">
              <div className="achievement-number">9</div>
              <div className="achievement-label">Лет опыта работы</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
