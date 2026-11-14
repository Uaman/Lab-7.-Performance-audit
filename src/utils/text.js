export function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[ʼ'`’]/g, '')
    .trim();
}

const tutorTextCache = new WeakMap();

function getTutorText(tutor) {
  if (!tutorTextCache.has(tutor)) {
    const text = normalizeText(
      [tutor.name, tutor.city, tutor.subjects.join(' '), tutor.bio].join(' ')
    );

    tutorTextCache.set(tutor, text);
  }
  return tutorTextCache.get(tutor);
}

let lastQuery = '';
let lastQueryWords = [];

export function matchesQuery(tutor, query) {
  if (!query) return true;

  if (query !== lastQuery) {
    lastQuery = query;
    lastQueryWords = normalizeText(query).split(/\s+/);
  }

  const haystack = getTutorText(tutor);
  return lastQueryWords.every((word) => haystack.includes(word));
}
