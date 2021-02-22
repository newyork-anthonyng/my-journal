import { Machine, assign } from 'xstate';
import { fetchEntries, saveEntry } from '../fetchApi';

export default Machine({
  id: 'journal',
  initial: 'loading',
  context: {
    entries: [],
    todaysEntry: null,
    text: ''
  },
  states: {
    loading: {
      invoke: {
        id: 'fetchJournalEntries',
        src: 'fetchJournalEntries',
        onDone: {
          target: 'success',
          actions: assign((_, event) => {
            return event.data;
          })
        },
        onError: {
          target: 'error'
        }
      }
    },

    success: {
      always: [
        {
          cond: 'didJournalToday', target: 'read'
        },

        { target: 'write' }
      ]
    },

    error: {
      type: 'final'
    },

    read: {
      on: {
        EDIT: {
          actions: assign(context => {
            return {
              text: context.todaysEntry.text
            }
          }),
          target: 'write'
        }
      }
    },

    write: {
      initial: 'noError',

      states: {
        noError: {},
        error: {
          initial: 'empty',
          states: {
            empty: {},
            api: {}
          }
        }
      },

      on: {
        CACHE_INPUT: {
          actions: assign((_, event) => {
            return {
              text: event.data
            }
          }),
          target: 'write.noError'
        },
        SAVE: [
          {
            cond: 'isTextEmpty',
            target: 'write.error.empty'
          },
          { target: 'loading_save' }
        ]
      }
    },

    loading_save: {
      invoke: {
        id: 'saveJournalEntry',
        src: 'saveJournalEntry',
        onDone: {
          actions: assign((_, event) => {
            return event.data;
          }),
          target: 'read'
        },
        onError: {
          target: 'write.error.api'
        }
      }
    }
  }
}, {
  guards: {
    didJournalToday: (context) => {
      return !!context.todaysEntry;
    },
    isTextEmpty: (context) => {
      return context.text.length === 0;
    }
  },
  services: {
    fetchJournalEntries: fetchEntries,
    saveJournalEntry: (context) => {
      return saveEntry(context.text);
    }
  },
});