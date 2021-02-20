  const journalMachine = Machine({
    id: 'journal',
    initial: 'loading',
    context: {
      journalEntryText: '',
      journalEntries: [],
      todaysJournalEntry: null,
    },
    states: {
      loading: {
        invoke: {
          id: 'fetchJournalEntries',
          src: 'fetchJournalEntries',
          onDone: {
            target: 'success',
            actions: 'cacheJournalEntries'
          },
          onError: {
            target: 'error'
          }
        }
      },
      success: {
        always: [
          {
            target: 'reading',
            cond: 'didJournalToday'
          },
          {
            target: 'creating'
          }
        ]
      },
      reading: {},
      creating: {},
      error: {
        type: 'final'
      }
    }
  }, {
    actions: {
      cacheJournalEntries: assign((context, event) => {
        return {
          journalEntries: event.entries,
          todaysJournalEntry: event.todaysJournalEntry
        };
      })
    },
    services: {
      fetchJournalEntries: () => {
        return Promise.resolve({});
      }
    },
    guards: {
      didJournalToday: (context) => {
        return !!context.todaysJournalEntry
      }
    }
  });
