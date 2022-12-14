import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { changeLevel } from '../redux/slices/userInfoSlice';
import QuestionnaireButton2 from './QuestionnaireButton2';

function ExperienceLevel({ choices, descriptions }: { choices: string[], descriptions: string[] }) {

  const dispatch = useAppDispatch();
  const selectedLevel = useAppSelector((state) => state.userInfo.level);

  const [currentSelection, setCurrentSelection] = useState<number | null>(null)
  const isDark = useAppSelector(state => state.darkMode)

  const [eventButton, setEventButton] = useState('');
  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    dispatch(changeLevel(event.currentTarget.value));

  }

  const generateTitle = function () {
    if (!selectedLevel) {
      return (
        <h1 className='title'> &#62; I am a <span className="underline">____</span> developer.</h1>
      )
    }
    if (selectedLevel === "beginner"){
      return (
        <h1 className='title'> &#62; I am a {selectedLevel} developer.</h1>
      )
    }
    return <h1 className='title'> &#62; I am an {selectedLevel} developer.</h1>
  }

  return (
    <div className="form-container flex-column">
      {generateTitle()}
      <div className="options-container flex-row">
        <div className="choices-container flex-column">
          {choices.map((text: string, index: number) =>
              <QuestionnaireButton2
                key={text}
                text={text}
                value={text}
                onClick={(event) => handleButtonClick(event)}
                onMouseEnter={() => setCurrentSelection(index)}
                onMouseLeave={() => setCurrentSelection(null)}
                selected={selectedLevel.includes(text)}
              />
              )}
        </div>
        {currentSelection == null ||
          <div className={isDark ? "descriptions-container-dark-mode" : "descriptions-container"}>
            <p className="info-tag">{descriptions[currentSelection]}</p>
          </div>}
      </div>
    </div>
  )
}

export default ExperienceLevel