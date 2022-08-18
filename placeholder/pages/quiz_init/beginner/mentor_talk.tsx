import { useState } from "react";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import Navbar from "../../../components/Navbar";
import { beginnerChoices, beginnerDescriptions } from '../../../utils/constants'
import MentorTalk from "../../../components/MentorTalk";
import { useAppSelector } from "../../../redux/hooks";

function BeginnerMentorTalk() {

  const [canProceed, setCanProceed] = useState(false);
  const mentorChoices = useAppSelector((state)=> state.beginnerForm.mentorFor);

  // if (mentorChoices.length) {
  //   setCanProceed(true);
  // }
  // else {
  //   setCanProceed(false);
  // }

  return (
    <div className="container flex-column outline">
      <Navbar />
      <MentorTalk choices={beginnerChoices} descriptions={beginnerDescriptions} progressValue={25} userLevel="beginner" />
      <div className="navigation-btns">
        <QuizNavigationButtons back='quiz_init/experience_level' next="quiz_init/beginner/which_technologies" canProceed={canProceed}/>
      </div>
    </div>
  )
}

export default BeginnerMentorTalk;