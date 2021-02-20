import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useMachine } from '@xstate/react';
import journalMachine from '../clients/machines/entries';

function getTodaysDate() {
  const date = (new Date()).toISOString().split('T')[0];
  return date;
}

const todaysDate = getTodaysDate();

export default function Home() {
  const [state, send] = useMachine(journalMachine);
  const { entries, todaysEntry, text } = state.context;

  if (state.matches("loading")) {
    return <p>Loading...</p>
  }

  if (state.matches("error")) {
    return <p>There was a problem loading. Please refresh the page.</p>
  }

  function handleEditButtonClick() {
    send({ type: 'EDIT' });
  }

  if (state.matches("read")) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Line by line Journal</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          <time dateTime={todaysDate}>{todaysDate}</time>

          <h2>Previous entries</h2>

          {
            entries.map(entry => {
              return <div key={entry.date}>
                <time dateTime={entry.date}>{entry.date}</time>
                <p>{entry.text}</p>
              </div>
            })
          }

          <h2>Today's Entry</h2>
          <div>
            <time dateTime={todaysEntry.date}>{todaysEntry.date}</time>
            <p>{todaysEntry.text}</p>
            <button onClick={handleEditButtonClick}>Edit</button>
          </div>
        </div>
      </div>
    );
  }

  function handleTextChange(e) {
    send({ type: "CACHE_INPUT", data: e.target.value });
  }

  function handleSaveButtonClick() {
    send({ type: 'SAVE' });
  }

  if (["write", "loading_save"].some(state.matches)) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Line by line Journal</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          <time dateTime={todaysDate}>{todaysDate}</time>

          <h2>Previous entries</h2>

          {
            entries.map(entry => {
              return <div key={entry.date}>
                <time dateTime={entry.date}>{entry.date}</time>
                <p>{entry.text}</p>
              </div>
            })
          }

          <textarea
            placeholder="Tell us about your day"
            value={text}
            onChange={handleTextChange}
          />

          {state.matches("write.error.empty") && <p>Journal entry cannot be blank</p>}
          {state.matches("write.error.api") && <p>There was a problem saving your journal entry. Try again.</p>}

          <button onClick={handleSaveButtonClick}>Save</button>
        </div>
      </div>
    )
  }
}
