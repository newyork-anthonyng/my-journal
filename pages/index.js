import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useMachine } from '@xstate/react';
import journalMachine from '../clients/machines/entries';

export default function Home() {
  const [state, send] = useMachine(journalMachine);
  const { entries, todaysEntry } = state.context;

  if (state.matches("loading")) {
    return <p>Loading...</p>
  }

  if (state.matches("error")) {
    return <p>There was a problem loading. Please refresh the page.</p>
  }

  if (state.matches("read")) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Line by line Journal</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          <time dateTime="2021-02-17">February 17, 2021</time>

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
          </div>
        </div>
      </div>
    );
  }

  if (state.matches("write")) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Line by line Journal</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          <time dateTime="2021-02-17">February 17, 2021</time>

          <h2>Previous entries</h2>

          {
            entries.map(entry => {
              return <div key={entry.date}>
                <time dateTime={entry.date}>{entry.date}</time>
                <p>{entry.text}</p>
              </div>
            })
          }

          <textarea placeholder="Tell us about your day" />
        </div>
      </div>
    )
  }
}
