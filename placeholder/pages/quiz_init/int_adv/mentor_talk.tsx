import MentorTalk from "../../../components/MentorTalk";
import Navbar from "../../../components/Navbar";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import { intermidiateChoices, intermidiateDescriptions } from "../../../utils/constants";



function IntermidiateMentorTalk() {

  return (
    <div className="container flex-column outline">
      <Navbar />
      <MentorTalk choices={intermidiateChoices} descriptions={intermidiateDescriptions} progressValue={25} />
      <QuizNavigationButtons back='quiz_init/int_adv/purpose' next="quiz_init/page10" />
    </div >
  )
}

export default IntermidiateMentorTalk;