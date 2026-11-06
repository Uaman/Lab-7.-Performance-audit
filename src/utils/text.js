export function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[ʼ'`’]/g, '')
    .trim();
}

const haystackCache = new WeakMap();

function getTutorHaystack(tutor) {
  let text = haystackCache.get(tutor);
  if (!text) {
    text = normalizeText([tutor.name, tutor.city, tutor.subjects.join(' '), tutor.bio].join(' '));
    haystackCache.set(tutor, text);
  }
  return text;
}

let lastQuery = null;
let lastWords = [];
function getQueryWords(query) {
  if (query === lastQuery) return lastWords;
  lastQuery = query;
  lastWords = normalizeText(query).split(/\s+/).filter(Boolean);
  return lastWords;
}


export function matchesQuery(tutor, query) {
  if (!query) return true;
  const words = getQueryWords(query);
  if (words.length === 0) return true;
  const haystack = getTutorHaystack(tutor);
  return words.every((word) => haystack.includes(word));
}
