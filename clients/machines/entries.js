import { Machine, assign } from 'xstate';
import { fetchEntries } from '../fetchApi';

export default Machine({
  id: 'journal',
  initial: 'loading',
  context: {
    entries: [],
    todaysEntry: null
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

    read: {},

    write: {},
  }
}, {
  guards: {
    didJournalToday: (context) => {
      return !!context.todaysEntry;
    }
  },
  services: {
    fetchJournalEntries: fetchEntries
  },
});