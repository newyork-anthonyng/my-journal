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

// placeholder function
export function saveEntry(text) {
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

  const newEntry = {
    text,
    date: '2021-02-20'
  };

  json.todaysEntry = newEntry;

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json));

  return Promise.resolve(json);
}