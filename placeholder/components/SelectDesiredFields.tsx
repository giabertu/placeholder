import { useState } from 'react';
import { useColorMode } from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changeDesiredCareers } from '../redux/slices/mentorPreferencesSlice';
import QuestionnaireButton from './QuestionnaireButton';
import QuestionnaireButton2 from './QuestionnaireButton2';


function Roles({ choices, beginner }: { choices: string[], beginner: boolean }) {

  const dispatch = useAppDispatch();
  const selectedFields = useAppSelector((state) => state.mentorPreferences.desiredCareers);

  const generateTitleBeginner = function () {
    if (!selectedFields.length) {
      return <h1 className="title"> &#62; I'm interested in a career as a <span className="underline">____</span> developer.</h1>
    }
    if (selectedFields[0] === "general") {
      return <h1 className="title"> &#62; I'm interested in a career as a developer.</h1>
    }
    return <h1 className="title"> &#62; I'm interested in a career as a {JSON.stringify(selectedFields).replaceAll(",", ", ")} developer.</h1>
  }

  const generateTitleInt_Adv = function () {
    if (!selectedFields.length) {
      return <h1 className="title"> &#62; I'd like to get career advice from a <span className="underline">____</span> developer .</h1>
    }
    return <h1 className="title"> &#62; I'd like to get career advice from a {JSON.stringify(selectedFields).replaceAll(",", ", ")} developer.</h1>
  }

  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    dispatch(changeDesiredCareers(event.currentTarget.value));
  }

  return (
    <div className="form-container-choices-list-no-description">
      {beginner ? generateTitleBeginner() : generateTitleInt_Adv()}
      <div className="choices-container-choices-list-no-description">
        {choices.map((text: string) =>
          <QuestionnaireButton2
            key={text}
            text={text}
            value={text}
            onClick={(event) => handleButtonClick(event)}
          />
        )}
      </div>
      {beginner && (
        <>
          <h2 className={isDark ? "horizontalRuleDarkMode" : "horizontalRule"}><span className={isDark ? "horizontalRuleTextDarkMode" : "horizontalRuleText"}>OR</span></h2>
          <QuestionnaireButton text="I'm unsure at this stage" value="general" onClick={handleButtonClick} />
        </>
      )}
    </div>
  )
}

export default Roles;