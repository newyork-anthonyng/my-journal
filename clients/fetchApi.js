// placeholder function.
const LOCAL_STORAGE_KEY = 'my-journal-abc';
export function fetchEntries() {
  const entries = localStorage.getItem(LOCAL_STORAGE_KEY);

  let json;
  try {
    json = JSON.parse(entries);
  } catch(e) {
    json = {
      entries: [],
      todaysEntry: null
    }
  }

  return Promise.resolve(json);
}