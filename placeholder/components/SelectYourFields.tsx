import { useState } from 'react';
import { useColorMode } from '@chakra-ui/react'
import uniqid from 'uniqid';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changeDeveloperField } from '../redux/slices/userInfoSlice';
import QuestionnaireButton from './QuestionnaireButton';

function Roles({ choices }: { choices: string[] }) {

  const dispatch = useAppDispatch();
  const selectedField = useAppSelector((state) => state.userInfo.developerField);

  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const eventButton = event.target as HTMLButtonElement;
    const buttonText = eventButton.innerText.replace('> ', '');
    console.log(buttonText);
    dispatch(changeDeveloperField(buttonText));
  }

  const generateTitle = function () {
    if (!selectedField) {
      return (
        <h1 className='title'> &#62; I am best described as a <span className="underline">____</span> developer.</h1>
      )
    }
    return <h1 className='title'> &#62; I am best described as a {selectedField} developer.</h1>
  }

  return (
    <div className="form-container-choices-list-no-description">
      {generateTitle()}
        <div className="choices-container-choices-list-no-description">
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
  )
}

export default Roles;