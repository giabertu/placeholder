import MentorTalk from "../../../components/MentorTalk";
import Navbar from "../../../components/Navbar";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import { int_advChoices, int_advDescriptions } from "../../../utils/constants";
import { useAppSelector } from "../../../redux/hooks";


function IntermediateMentorTalk() {

  const mentorChoices = useAppSelector((state) => state.mentorPreferences.desiredCategories)
  const subroute = mentorChoices.includes("expanding my programming skillset") ? "which_technologies": "which_careers";

  return (
    <div className="container flex-column">
      <Navbar progressValue={25}/>
      <MentorTalk choices={int_advChoices} descriptions={int_advDescriptions} />
      <QuizNavigationButtons next={`quiz_init/int_adv/${subroute}`} canProceed={Boolean(mentorChoices.length)}/>
     
    </div >
  )
}

export default IntermediateMentorTalk;