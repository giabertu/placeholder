import { useState } from "react";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import Navbar from "../../../components/Navbar";
import { beginnerChoices, beginnerDescriptions } from '../../../utils/constants'
import MentorTalk from "../../../components/MentorTalk";
import { useAppSelector } from "../../../redux/hooks";

function BeginnerMentorTalk() {

  const mentorChoices = useAppSelector((state)=> state.mentorPreferences.desiredCategories);

  return (
    <div className="container flex-column outline">
      <Navbar />
      <MentorTalk choices={beginnerChoices} descriptions={beginnerDescriptions} progressValue={25} />
      <QuizNavigationButtons back='quiz_init/experience_level' next="quiz_init/beginner/which_technologies" canProceed={Boolean(mentorChoices.length)}/>
    </div>
  )

}

export default BeginnerMentorTalk;