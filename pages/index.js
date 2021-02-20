import Head from 'next/head'
import styles from '../styles/Home.module.css'

// Today's date
// Make "api" call to get previous journal entries for the date
// Create, Read, Update allow user to save journal entry

const data = {
  entries: [
    {
      date: "2021-02-16",
      text: "This was a bad day"
    },
    {
      date: "2021-02-15",
      text: "This was a great day"
    }
  ]
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Line by line Journal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <time datetime="2021-02-17">February 17, 2021</time>

        <h2>Previous entries</h2>

        {
          data.entries.map(entry => {
            return <div key={entry.date}>
              <time datetime={entry.date}>{entry.date}</time>
              <p>{entry.text}</p>
            </div>
          })
        }

        <textarea placeholder="Tell us about your day" />
      </div>
    </div>
  )
}
