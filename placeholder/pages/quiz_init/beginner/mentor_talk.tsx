import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import Navbar from "../../../components/Navbar";
import { beginnerChoices, beginnerDescriptions } from '../../../utils/constants'
import MentorTalk from "../../../components/MentorTalk";

function BeginnerMentorTalk() {

  return (
    <div className="container flex-column outline">
      <Navbar />
      <MentorTalk choices={beginnerChoices} descriptions={beginnerDescriptions} progressValue={25} />
      <QuizNavigationButtons back='quiz_init/page1' next="quiz_init/page3" />
    </div >
  )
}


export default BeginnerMentorTalk;