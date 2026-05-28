import { push, ref, set } from 'firebase/database';
import { database } from '../lib/firebase';

const STUDENTS_PATH = 'applications/students';
const EMPLOYERS_PATH = 'applications/employers';

async function saveApplication(path, payload) {
  const listRef = ref(database, path);
  const newRef = push(listRef);
  const createdAt = Date.now();

  await set(newRef, {
    ...payload,
    id: newRef.key,
    createdAt,
  });

  return newRef.key;
}

export function submitPracticeApplication(payload) {
  return saveApplication(STUDENTS_PATH, payload);
}

export function submitEmployerApplication(payload) {
  return saveApplication(EMPLOYERS_PATH, payload);
}
