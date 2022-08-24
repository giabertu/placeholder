import React, { useState } from 'react';
import ColorModeToggle from '../../components/ColorModeToggle';
import Navbar from '../../components/Navbar'
import { levelChoices, levelDescriptions } from '../../utils/constants';
import QuizNavigationButtons from '../../components/QuizNavigationButtons';
import { useAppSelector } from '../../redux/hooks';

import UserLevelForm from '../../components/ExperienceLevel';

function ExperienceLevel() {
  

  const selectedLevel = useAppSelector((state) => state.userInfo.level);

  const [route, subroute] = selectedLevel === "beginner" ? ["beginner", "mentor_talk"] : ["int_adv", "roles"];

  return (
    <div className="container">
      <Navbar progressValue={10}/>
      <UserLevelForm choices={levelChoices} descriptions={levelDescriptions} />
      <QuizNavigationButtons back='/' next={`quiz_init/${route}/${subroute}`} canProceed={Boolean(selectedLevel)}/>
    </div>
  )
}

export default ExperienceLevel