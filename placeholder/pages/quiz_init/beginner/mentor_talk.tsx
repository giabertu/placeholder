import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import Navbar from "../../../components/Navbar";
import { beginnerChoices, beginnerDescriptions } from '../../../utils/constants'
import MentorTalkForm from "../../../components/MentorTalk";
import { useAppSelector } from "../../../redux/hooks";

function BeginnerMentorTalk() {

  const mentorChoices = useAppSelector((state)=> state.mentorPreferences.desiredCategories);
  const subroute = mentorChoices.includes("learning how to program") ? "which_technologies": "which_careers";

  return (
    <div className="container">
      <Navbar progressValue={30}/>
      <MentorTalkForm choices={beginnerChoices} descriptions={beginnerDescriptions} />
      <QuizNavigationButtons back='quiz_init/experience_level' next={`quiz_init/beginner/${subroute}`} canProceed={Boolean(mentorChoices.length)}/>
    </div>
  )

}

export default BeginnerMentorTalk;