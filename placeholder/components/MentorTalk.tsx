import { useState } from 'react';
import ProgressBar from './ProgressBar';
import {useColorMode} from '@chakra-ui/react'

function MentorTalk({ choices, descriptions, progressValue }: { choices: string[], descriptions: string[], progressValue: number }) {

  const [choice, setChoice] = useState<string[]>([''])
  const [currentSelection, setCurrentSelection] = useState<number | null>(null)
  const  {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const eventButton = event.target as HTMLButtonElement;
    const buttonText = eventButton.innerText.replace('> ', '');
    if (choice[0] == '') {
      setChoice([buttonText])
    } else if (choice.includes(buttonText)) {
      choice.length == 1 ? setChoice(['']) : setChoice(() => choice.filter(item => item !== buttonText))
    } else {
      setChoice(choice.concat(buttonText))
    }
  }

  function getStringifiedArray() {
    return JSON.stringify(choice).replace(/,/g, ', ');
  }

  return (
    <div className="question-container flex-column">
      <ProgressBar value={progressValue} />
      <div className="title-container flex-row">
        <h1 className='h1'> &#62; I'd like to speak to my mentor about <span className='h1-span'>{getStringifiedArray()}</span></h1>
      </div>
      <div className="input-description-container flex-row">
        <div className="options-container flex-column">
          {choices.map((choice: string, index: number) =>
            <button className={isDark ? 'button-style-dark-mode' : 'button-style'}
              onMouseEnter={() => setCurrentSelection(index)}
              onMouseLeave={() => setCurrentSelection(null)}
              onClick={(event) => handleButtonClick(event)}>&gt; {choice}</button>)}
        </div>
        {currentSelection == null ||
          <div className={isDark ? "description-container-dark-mode" : "description-container"}>
            <p className="info-tag">{descriptions[currentSelection]}</p>
          </div>}
      </div>
    </div>
  )
}

export default MentorTalk;