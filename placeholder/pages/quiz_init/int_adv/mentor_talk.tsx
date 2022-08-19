import MentorTalk from "../../../components/MentorTalk";
import Navbar from "../../../components/Navbar";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import { intermidiateChoices, intermidiateDescriptions } from "../../../utils/constants";
import { useAppSelector } from "../../../redux/hooks";

const desiredMentorCategories = useAppSelector((state) => state.mentorPreferences.desiredCategories)

function IntermidiateMentorTalk() {

  return (
    <div className="container flex-column outline">
      <Navbar progressValue={25}/>
      <MentorTalk choices={intermidiateChoices} descriptions={intermidiateDescriptions} />
      <QuizNavigationButtons back='quiz_init/int_adv/Purpose' next="quiz_init/page10" canProceed={Boolean(desiredMentorCategories.length)}/>
    </div >
  )
}

export default IntermidiateMentorTalk;