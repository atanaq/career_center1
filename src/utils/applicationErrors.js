/**
 * Понятное сообщение по коду ошибки Firebase (Realtime Database).
 * localhost не блокируется — чаще всего срабатывает PERMISSION_DENIED из-за правил БД.
 */
export function getApplicationSubmitErrorMessage(error) {
  console.error('Ошибка отправки заявки в Firebase:', error);

  const code = error?.code ?? '';

  if (code === 'PERMISSION_DENIED') {
    return (
      'Запись в базу запрещена правилами Firebase. Откройте Firebase Console → ' +
      'Realtime Database → Правила и разрешите запись в applications/students и applications/employers.'
    );
  }

  if (code === 'UNAVAILABLE') {
    return 'Сервер Firebase недоступен. Проверьте интернет и что Realtime Database включена в проекте.';
  }

  if (import.meta.env.DEV && error?.message) {
    return `Ошибка (${code || 'unknown'}): ${error.message}`;
  }

  return 'Не удалось отправить заявку. Откройте консоль браузера (F12) — там код ошибки Firebase.';
}
