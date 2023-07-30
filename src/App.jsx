import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const api_url = "https://api.adviceslip.com/advice"

  const [adviceId, setAdviceID] = useState();
  const [proverb, setProverb] = useState("");

  useEffect(() => {
    getAdvice();
  }, [])

  async function getAdvice() {

    try {
      const resp = await fetch(api_url);

      if (!resp.ok) {
        throw new Error(`HTTP error: ${resp.status}`);
      } else {
        const advice = await resp.json();
        setAdviceID(advice.slip.id)
        setProverb(advice.slip.advice);
      }
    } catch (error) {
      console.log(`An error has occured: ${error}`);
    }
  }

  const rollDice = () => {
    getAdvice();
  }



  return (
    <>
      <div className='container' role='main'>
        <div className='card'>
          <div className='card-body'>
            <div className='advice-num'>
              Advice #{adviceId}
            </div>
            <div className='advice-text'>
              "{proverb}"
            </div>
            <div className='divider-mobile'>
              <img src="assets/images/pattern-divider-mobile.svg" alt='a horizontal line bisected by two short parallel lines'/>
            </div>
            <div className='divider-desktop'>
              <img src="assets/images/pattern-divider-desktop.svg" alt='a horizontal line bisected by two short parallel lines' />
            </div>
          </div>
        </div>
        <button onClick={rollDice} aria-label='generate advice'></button>
      </div>

    </>
  )
}

export default App
