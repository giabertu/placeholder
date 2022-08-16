import ProgressBar from "../components/ProgressBar";
import QuizCompanyName from "../components/QuizCompanyName";
import { useState } from 'react'
import QuizNavigationButtons from "../components/QuizNavigationButtons";


const initialTitle = 'I\'d like to speak to my mentor about ___________'
const choicesArray = ['learning how to program', 'switching careers', 'finding my dream developer role', 'writing better code']

function Page2() {

  const [choice, setChoice] = useState<string>('___________')
  const [currentSelection, setCurrentSelection] = useState<number | null>(null)

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const eventButton = event.target as HTMLButtonElement;
    const endOfTitle = eventButton.innerText.replace('> ', '');
    setChoice(endOfTitle)
  }

  return (
    <div className="container flex-column outline">
      <QuizCompanyName />
      <div className="question-container flex-column outline">
        <ProgressBar value={25} />
        <div className="title-container flex-row">
          <h1 className='h1'>I'd like to speak to my mentor about <span className='h1-span'>{choice}</span></h1>
        </div>
        <div className="input-description-container flex-row">
          <div className="options-container flex-column">
            <button className="button-style"
              onMouseEnter={() => setCurrentSelection(0)}
              onMouseLeave={() => setCurrentSelection(null)}
              onClick={(event) => {
                handleButtonClick(event);
              }}>&gt; learning how to program</button>
            <button className="button-style"
              onMouseEnter={() => setCurrentSelection(1)}
              onMouseLeave={() => setCurrentSelection(null)}
              onClick={(event) => {
                handleButtonClick(event)
              }}>&gt; switching careers</button>
            <button className="button-style"
              onMouseEnter={() => setCurrentSelection(2)}
              onMouseLeave={() => setCurrentSelection(null)}
              onClick={(event) => {
                handleButtonClick(event)
              }}>&gt; finding my dream developer role</button>
            <button className="button-style"
              onMouseEnter={() => setCurrentSelection(3)}
              onMouseLeave={() => setCurrentSelection(null)}
              onClick={(event) => {
                handleButtonClick(event)
              }}>&gt; writing better code</button>
          </div>
          {currentSelection == null || <div className="description-container">
            {currentSelection == 0 &&
              <div>
                <p className="info-tag">Programming can be intimidating, and it can be
                  difficult to know where to start. I'd like a mentor
                  that can show me the ropes and give me some direction,
                  or even teach me about a specific technology.</p>
              </div>
            }
            {currentSelection == 1 &&
              <p className="info-tag">I am considering becoming a Software Developer and I would
                like to ask someone in the field more about it. I am looking for
                insights and practical advice to help me make a potential switch.
              </p>
            }
            {currentSelection == 2 &&
              <p className="info-tag">A career in developing is highly rewarding and challenging,
                but it may be a daunting prospect for some. I'd like a
                mentor that can be authentic in talking about the good and the bad of different roles.
              </p>}
            {currentSelection == 3 &&
              <p className="info-tag">I have been coding for some time and I am ready to take it up a notch.
                I am looking for someone that will review my code and suggest improvements
                that will improve my skill and help me code more confidently.
              </p>
            }
          </div>}
        </div>
      </div>
      <QuizNavigationButtons back='/' next="page3" />
    </div >
  )
}


export default Page2;