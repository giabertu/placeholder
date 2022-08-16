import MentorTalk from "../../../components/MentorTalk";
import Navbar from "../../../components/Navbar";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import { intermidiateChoices, intermidiateDescriptions } from "../../../utils/constants";



function IntermidiateMentorTalk() {

  return (
    <div className="container flex-column outline">
      <Navbar />
      <MentorTalk choices={intermidiateChoices} descriptions={intermidiateDescriptions} progressValue={25} />
      <QuizNavigationButtons back='quiz_init/page1' next="quiz_init/page3" />
    </div >
  )
}

export default IntermidiateMentorTalk;