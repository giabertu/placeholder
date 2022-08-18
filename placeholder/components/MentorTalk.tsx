import { useState } from 'react';
import { useColorMode } from '@chakra-ui/react'
import uniqid from 'uniqid';

import ProgressBar from './ProgressBar';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { beginnerChangeMentorFor } from '../redux/slices/beginnerFormSlice';
import { nonBeginnerChangeMentorFor } from '../redux/slices/nonBeginnerFormSlice';


function MentorTalk({ choices, descriptions, progressValue, userLevel }: { choices: string[], descriptions: string[], progressValue: number, userLevel: string }) {

  const dispatch = useAppDispatch();

  const mentorChoices = useAppSelector((state) => {
    return userLevel === "beginner" ?
      state.beginnerForm.mentorFor :
      state.nonBeginnerForm.mentorFor
  })

  const action = userLevel === "beginner" ?
    beginnerChangeMentorFor :
    nonBeginnerChangeMentorFor

  const [currentSelection, setCurrentSelection] = useState<number | null>(null)
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const eventButton = event.target as HTMLButtonElement;
    const buttonText = eventButton.innerText.replace('> ', '');
    dispatch(action(buttonText));
  }

  function getStringifiedArray() {
    return JSON.stringify(mentorChoices).replace(/,/g, ', ');
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
              key={uniqid()}
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
