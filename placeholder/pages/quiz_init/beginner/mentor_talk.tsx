import { useState } from "react";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import Navbar from "../../../components/Navbar";
import { beginnerChoices, beginnerDescriptions } from '../../../utils/constants'
import MentorTalk from "../../../components/MentorTalk";
import { useAppSelector } from "../../../redux/hooks";
import ProgressBar from "../../../components/ProgressBar";

function BeginnerMentorTalk() {

  const mentorChoices = useAppSelector((state)=> state.mentorPreferences.desiredCategories);

  return (
    <div className="container">
      <Navbar />
      <ProgressBar value={25} />
      <MentorTalk choices={beginnerChoices} descriptions={beginnerDescriptions} />
      <QuizNavigationButtons back='quiz_init/experience_level' next="quiz_init/beginner/which_technologies" canProceed={Boolean(mentorChoices.length)}/>
    </div>
  )

}

export default BeginnerMentorTalk;