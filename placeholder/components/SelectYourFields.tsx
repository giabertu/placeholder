import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import QuestionnaireButton2 from './QuestionnaireButton2';
import { changeDeveloperField } from '../redux/slices/userInfoSlice';



function Roles({ choices }: { choices: string[] }) {

  const dispatch = useAppDispatch();
  const selectedField = useAppSelector((state) => state.userInfo.developerField);

  

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
            <QuestionnaireButton2
              key={text}
              text={text}
              value={text}
              onClick={(event) => handleButtonClick(event)}
              selected={selectedField === text}
            />
          )}
        </div>
    </div>
  )
}

export default Roles;