import { useState } from 'react';
import { useColorMode } from '@chakra-ui/react'
import uniqid from 'uniqid';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changeDesiredCategory } from '../redux/slices/mentorPreferencesSlice';
import QuestionnaireButton from './QuestionnaireButton';

function Roles({ choices }: { choices: string[] }) {

  const dispatch = useAppDispatch();
  const selectedField = useAppSelector((state) => state.userInfo.developerField);

  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const eventButton = event.target as HTMLButtonElement;
    const buttonText = eventButton.innerText.replace('> ', '');
    dispatch(changeDesiredCategory(buttonText));
  }

  const generateTitle = function () {
    if (!selectedField) {
      return (
        <h1 className='title'> &#62; I am a <span className="underline">____</span> developer.</h1>
      )
    }
    return <h1 className='title'> &#62; I am a {selectedField} developer.</h1>
  }

  return (
    <div className="form-container flex-column">
      {generateTitle()}
      <div className="options-container flex-row">
        <div className="choices-container flex-column">
          {choices.map((text: string) =>
              <QuestionnaireButton
                key={uniqid()}
                text={text}
                value={text}
                onClick={(event) => handleButtonClick(event)}
              />
              )}
        </div>
      </div>
    </div>
  )
}

export default Roles;
