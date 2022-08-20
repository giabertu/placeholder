import { useState } from 'react';
import { useColorMode } from '@chakra-ui/react'
import uniqid from 'uniqid';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changeDesiredCategory } from '../redux/slices/mentorPreferencesSlice';
import QuestionnaireButton from './QuestionnaireButton';

function MentorTalk({ choices, descriptions }: { choices: string[], descriptions: string[] }) {

  const dispatch = useAppDispatch();

  const mentorChoices = useAppSelector((state) => state.mentorPreferences.desiredCategories);

  const [currentSelection, setCurrentSelection] = useState<number | null>(null)
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const eventButton = event.target as HTMLButtonElement;
    const buttonText = eventButton.innerText.replace('> ', '');
    dispatch(changeDesiredCategory(buttonText));
  }

  function getStringifiedArray() {
    return JSON.stringify(mentorChoices).replace(/,/g, ', ');
  }

  return (
    <div className="form-container flex-column">
      <h1 className='title'> I'd like to speak to my mentor about {mentorChoices.length ? getStringifiedArray() : <span className="underline">_______</span>}</h1>
      <h2 className='subtitle'>Choose all that apply</h2>
      <div className="options-container flex-row">
        <div className="choices-container flex-column">
          {choices.map((text: string, index: number) =>
              <QuestionnaireButton
                key={uniqid()}
                text={text}
                value={text}
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

export default MentorTalk;
