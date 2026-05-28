import { formatPhone } from '../utils/formatPhone';
import {
  EMPTY_PRACTICE_APPLICATION,
  PRACTICE_FORMAT_OPTIONS,
  STUDENT_STATUS_OPTIONS,
} from '../constants/practiceApplication';

export { EMPTY_PRACTICE_APPLICATION };

export default function PracticeApplicationForm({
  formData,
  onChange,
  onSubmit,
  submitLabel = 'Оставить заявку на практику',
  showProfessionField = false,
  professionTitle = '',
  compact = false,
  isSubmitting = false,
  submitError = '',
}) {
  const update = (field, value) => onChange({ ...formData, [field]: value });

  return (
    <form
      className={`practice-application-form${compact ? ' practice-application-form--compact' : ''}`}
      onSubmit={onSubmit}
    >
      {showProfessionField && professionTitle && (
        <div className="form-group">
          <label>Направление практики</label>
          <input type="text" value={professionTitle} readOnly className="input-readonly" />
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label>Фамилия</label>
          <input
            type="text"
            placeholder="Иванов"
            value={formData.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Имя</label>
          <input
            type="text"
            placeholder="Иван"
            value={formData.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Отчество</label>
          <input
            type="text"
            placeholder="Иванович"
            value={formData.middleName}
            onChange={(e) => update('middleName', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Дата рождения</label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => update('birthDate', e.target.value)}
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
            onChange={(e) => update('phone', formatPhone(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="example@mail.ru"
            value={formData.email}
            onChange={(e) => update('email', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Статус</label>
          <select
            value={formData.studentStatus}
            onChange={(e) => update('studentStatus', e.target.value)}
            required
          >
            <option value="">Выберите статус</option>
            {STUDENT_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Группа</label>
          <input
            type="text"
            placeholder="Например, СВ-21"
            value={formData.studyGroup}
            onChange={(e) => update('studyGroup', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Специальность обучения</label>
        <input
          type="text"
          placeholder="Например, Сварщик"
          value={formData.studySpecialty}
          onChange={(e) => update('studySpecialty', e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Формат практики</label>
          <select
            value={formData.practiceFormat}
            onChange={(e) => update('practiceFormat', e.target.value)}
            required
          >
            <option value="">Выберите формат</option>
            {PRACTICE_FORMAT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Желаемая дата начала</label>
          <input
            type="date"
            value={formData.desiredStartDate}
            onChange={(e) => update('desiredStartDate', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Город проживания</label>
          <input
            type="text"
            placeholder="Ваш город"
            value={formData.city}
            onChange={(e) => update('city', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Опыт работы</label>
          <select
            value={formData.hasWorkExperience}
            onChange={(e) => update('hasWorkExperience', e.target.value)}
            required
          >
            <option value="">Выберите вариант</option>
            <option value="no">Нет опыта</option>
            <option value="yes">Есть опыт</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Комментарий</label>
        <textarea
          placeholder="Укажите пожелания по предприятию, графику или дополнительные сведения для администратора..."
          value={formData.comment}
          onChange={(e) => update('comment', e.target.value)}
          rows={compact ? 3 : 4}
        />
      </div>

      <label className="form-checkbox">
        <input
          type="checkbox"
          checked={formData.agreedToPrivacy}
          onChange={(e) => update('agreedToPrivacy', e.target.checked)}
          required
        />
        <span>Согласен на обработку персональных данных и передачу сведений в админ-панель центра</span>
      </label>

      {submitError && <p className="form-error">{submitError}</p>}

      <button type="submit" className="form-submit" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : submitLabel}
      </button>
    </form>
  );
}
