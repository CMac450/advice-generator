import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const api_url = "http://localhost:3001/advice"

  const [adviceId, setAdviceID] = useState();
  const [proverb, setProverb] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    getAdvice();
  }, []);

  async function getAdvice() {
    try {
      const resp = await fetch(api_url, { cache: "no-cache" });
      if (!resp.ok) throw new Error(`HTTP error: ${resp.status}`);
      const quoteData = await resp.json();

      // ZenQuotes returns an array with one quote object
      const quote = quoteData[0];
      setAdviceID(Math.floor(Math.random() * 1000));
      setProverb(`${quote.q}`);
      setAuthor(`— ${quote.a}`);
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  }

  return (
      <div className='container' role='main'>
        <div className='card'>
          <div className='card-body'>
            <div className='advice-num'>Advice #{adviceId}</div>
            <div className='advice-text advice-text-proverb'>"{proverb}"</div>
            <div className='advice-text advice-text-author'>{author}</div>
            <div className='divider-mobile'>
              <img src="assets/images/pattern-divider-mobile.svg" alt='divider' />
            </div>
            <div className='divider-desktop'>
              <img src="assets/images/pattern-divider-desktop.svg" alt='divider' />
            </div>
          </div>
        </div>
        <button onClick={getAdvice} aria-label='generate advice'></button>
      </div>
  );
}

export default App;