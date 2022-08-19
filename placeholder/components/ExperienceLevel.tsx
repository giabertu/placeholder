import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useColorMode } from '@chakra-ui/react';
import { changeUserLevel } from '../redux/slices/userInfoSlice';
import QuestionnaireButton from './QuestionnaireButton';
import uniqid from 'uniqid';

function ExperienceLevel({ choices, descriptions }: { choices: string[], descriptions: string[] }) {

  const dispatch = useAppDispatch();
  const selectedLevel = useAppSelector((state) => state.userInfo.level);

  const [currentSelection, setCurrentSelection] = useState<number | null>(null)
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const eventButton = event.target as HTMLButtonElement;
    const buttonText = eventButton.innerText.replace('> ', '');
    dispatch(changeUserLevel(buttonText));
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
              <QuestionnaireButton
                key={uniqid()}
                text={text}
                value={text === "beginner" ? "beginner" : "int_adv"}
                onClick={(event) => handleButtonClick(event)}
                onMouseEnter={() => setCurrentSelection(index)}
                onMouseLeave={() => setCurrentSelection(null)}
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