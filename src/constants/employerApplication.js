import { APPLICATION_SOURCE_LABELS } from './practiceApplication';

export function buildEmployerApplicationPayload(formData, extra = {}) {
  const source = extra.source || 'employers-page';
  const company = formData.company.trim();
  const contactPerson = formData.contact.trim();
  const vacancy = formData.vacancy.trim();

  return {
    type: 'employer',
    status: 'new',
    submittedAt: new Date().toISOString(),
    source,
    sourceLabel: APPLICATION_SOURCE_LABELS[source] ?? source,
    summary: [company, vacancy, contactPerson].filter(Boolean).join(' · '),
    company,
    contactPerson,
    email: formData.email.trim(),
    phone: formData.phone,
    vacancy,
    requirements: formData.requirements.trim(),
  };
}
