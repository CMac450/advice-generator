import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const api_url = "http://localhost:3001/advice"
  
  const defaultProverb = "It is easy to sit up and take notice, what's difficult is getting up and taking action.";
  const defaultAdviceId = "117";

  const [adviceId, setAdviceID] = useState(defaultAdviceId);
  const [proverb, setProverb] = useState(defaultProverb);
  const [author, setAuthor] = useState("");
  
  async function getAdvice() {
    try {
      const resp = await fetch(api_url, { cache: "no-cache" });
      if (!resp.ok) throw new Error(`HTTP error: ${resp.status}`);
      const quoteData = await resp.json();

      // ZenQuotes returns an array with one quote object
      const quote = quoteData[0];
      quote.q !== "Too many requests. Obtain an auth key for unlimited access." ? setProverb(`${quote.q}`) : setProverb(defaultProverb);
      quote.q !== "Too many requests. Obtain an auth key for unlimited access." ? setAdviceID(Math.floor(Math.random() * 1000)) : setAdviceID(defaultAdviceId);
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
            {/*<div className='advice-text advice-text-author'>{author}</div>*/}
            <div className='divider divider-mobile'>  
              <img src="assets/images/pattern-divider-mobile.svg" alt='divider'/>
            </div>
            <div className='divider divider-desktop'>
              <img src="assets/images/pattern-divider-desktop.svg" alt='divider'/>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <button onClick={getAdvice} aria-label='generate advice'>
            <img src="/assets/images/icon-dice.svg" alt='generate advice'/>
          </button>
        </div>
      </div>
  );
}

export default App;