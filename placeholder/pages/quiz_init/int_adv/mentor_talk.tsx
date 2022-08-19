import MentorTalk from "../../../components/MentorTalk";
import Navbar from "../../../components/Navbar";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import { IntermediateChoices, IntermediateDescriptions } from "../../../utils/constants";
import { useAppSelector } from "../../../redux/hooks";

const desiredMentorCategories = useAppSelector((state) => state.mentorPreferences.desiredCategories)

function IntermediateMentorTalk() {

  return (
    <div className="container flex-column">
      <Navbar progressValue={25}/>
      <MentorTalk choices={IntermediateChoices} descriptions={IntermediateDescriptions} />
      <QuizNavigationButtons back='quiz_init/int_adv/Purpose' next="quiz_init/page10" canProceed={Boolean(desiredMentorCategories.length)}/>
    </div >
  )
}

export default IntermediateMentorTalk;