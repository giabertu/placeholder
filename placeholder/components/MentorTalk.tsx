import { useState } from 'react'
import ProgressBar from './ProgressBar';

function MentorTalk({ choices, descriptions, progressValue }: { choices: string[], descriptions: string[], progressValue: number }) {

  const [choice, setChoice] = useState<string>('___________')
  const [currentSelection, setCurrentSelection] = useState<number | null>(null)

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const eventButton = event.target as HTMLButtonElement;
    const endOfTitle = eventButton.innerText.replace('> ', '');
    setChoice(endOfTitle)
  }

  return (
    <div className="question-container flex-column outline">
      <ProgressBar value={progressValue} />
      <div className="title-container flex-row">
        <h1 className='h1'>I'd like to speak to my mentor about<span className='h1-span'>{choice}</span></h1>
      </div>
      <div className="input-description-container flex-row">
        <div className="options-container flex-column">
          {choices.map((choice: string, index: number) =>
            <button className="button-style"
              onMouseEnter={() => setCurrentSelection(index)}
              onMouseLeave={() => setCurrentSelection(null)}
              onClick={(event) => handleButtonClick(event)}>&gt; {choice}</button>)}
        </div>
        {currentSelection == null ||
          <div className="description-container">
            <p className="info-tag">{descriptions[currentSelection]}</p>
          </div>}
      </div>
    </div>
  )
}

export default MentorTalk;