export const EMPTY_PRACTICE_APPLICATION = {
  lastName: '',
  firstName: '',
  middleName: '',
  phone: '',
  email: '',
  birthDate: '',
  studentStatus: '',
  studyGroup: '',
  studySpecialty: '',
  practiceFormat: '',
  desiredStartDate: '',
  hasWorkExperience: '',
  city: '',
  comment: '',
  agreedToPrivacy: false,
};

export const STUDENT_STATUS_OPTIONS = [
  { value: 'student', label: 'Студент колледжа' },
  { value: 'graduate', label: 'Выпускник' },
  { value: 'external', label: 'Внешний кандидат' },
];

export const PRACTICE_FORMAT_OPTIONS = [
  { value: 'onsite', label: 'Очная на предприятии' },
  { value: 'hybrid', label: 'Смешанный формат' },
  { value: 'remote', label: 'Дистанционная подготовка' },
];

export const APPLICATION_SOURCE_LABELS = {
  'home-main-form': 'Главная — форма практики',
  'home-profession-modal': 'Главная — направление',
  'practice-page': 'Страница «Практика»',
  'professions-page': 'Страница «Направления»',
  'employers-page': 'Страница «Работодателям»',
  website: 'Сайт',
};

function labelFromOptions(options, value) {
  return options.find((item) => item.value === value)?.label ?? value;
}

export function buildPracticeApplicationPayload(formData, extra = {}) {
  const source = extra.source || 'website';
  const fullName = [formData.lastName, formData.firstName, formData.middleName]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' ');

  const studentStatusLabel = labelFromOptions(STUDENT_STATUS_OPTIONS, formData.studentStatus);
  const practiceFormatLabel = labelFromOptions(PRACTICE_FORMAT_OPTIONS, formData.practiceFormat);
  const hasWorkExperience = formData.hasWorkExperience === 'yes';
  const profession = extra.profession || '';

  const summaryParts = [fullName, formData.studyGroup.trim(), practiceFormatLabel].filter(Boolean);
  if (profession) summaryParts.push(profession);

  return {
    type: 'practice',
    status: 'new',
    submittedAt: new Date().toISOString(),
    source,
    sourceLabel: APPLICATION_SOURCE_LABELS[source] ?? source,
    summary: summaryParts.join(' · '),
    applicant: {
      lastName: formData.lastName.trim(),
      firstName: formData.firstName.trim(),
      middleName: formData.middleName.trim(),
      fullName,
      phone: formData.phone,
      email: formData.email,
      birthDate: formData.birthDate,
      city: formData.city.trim(),
      studentStatus: formData.studentStatus,
      studentStatusLabel,
      studyGroup: formData.studyGroup.trim(),
      studySpecialty: formData.studySpecialty.trim(),
      hasWorkExperience,
      hasWorkExperienceLabel: hasWorkExperience ? 'Есть опыт' : 'Нет опыта',
    },
    practice: {
      profession,
      professionId: extra.professionId ?? null,
      format: formData.practiceFormat,
      formatLabel: practiceFormatLabel,
      desiredStartDate: formData.desiredStartDate,
      comment: formData.comment.trim(),
    },
  };
}
