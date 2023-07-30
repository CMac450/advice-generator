import { useState } from 'react'
import './App.css'

function App() {
  const api_url = "https://api.adviceslip.com/advice"

  const [adviceId, setAdviceID] = useState(117);
  const [proverb, setProverb] = useState("It is easy to sit up and take notice, what's difficult is getting up and taking action.");

  async function getAdvice () {
    const resp = await fetch(api_url);
    const advice = await resp.json();

    setAdviceID(advice.slip.id)
    setProverb(advice.slip.advice);
  }

  const rollDice = () => {
    getAdvice();
  }

  return (
    <>
      <div className='container'>
        <div className='card'>
          <div className='card-body'>
            <div className='advice-num'>
              Advice #{adviceId}
            </div>
            <div className='advice-text'>
              "{proverb}"
            </div>
            <div className='divider-mobile'>
              <img src="assets/images/pattern-divider-mobile.svg" />
            </div>
            <div className='divider-desktop'>
              <img src="assets/images/pattern-divider-desktop.svg" />
            </div>
          </div>
        </div>
        <div className='button'>
          <button onClick={rollDice}></button>
        </div>
      </div>
      
    </>
  )
}

export default App
