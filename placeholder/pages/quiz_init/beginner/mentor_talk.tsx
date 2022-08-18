import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import Navbar from "../../../components/Navbar";
import { beginnerChoices, beginnerDescriptions } from '../../../utils/constants'
import MentorTalk from "../../../components/MentorTalk";

function BeginnerMentorTalk() {

  return (
    <div className="container flex-column outline">
      <Navbar />
      <MentorTalk choices={beginnerChoices} descriptions={beginnerDescriptions} progressValue={25} />
      <div className="navigation-btns">
        <QuizNavigationButtons back='quiz_init/beginner/experience_level' next="quiz_init/page3" />
      </div>
      
    </div >
  )
}


export default BeginnerMentorTalk;