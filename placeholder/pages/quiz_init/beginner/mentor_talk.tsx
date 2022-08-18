import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import Navbar from "../../../components/Navbar";
import { beginnerChoices, beginnerDescriptions } from '../../../utils/constants'
import MentorTalk from "../../../components/MentorTalk";

function BeginnerMentorTalk() {

  return (
    <div className="container flex-column outline">
      <Navbar />
      <MentorTalk choices={beginnerChoices} descriptions={beginnerDescriptions} progressValue={25} />
<<<<<<< HEAD
      <div className="navigation-btns">
        <QuizNavigationButtons back='quiz_init/beginner/experience_level' next="quiz_init/page3" />
      </div>
      
=======
      <QuizNavigationButtons back='quiz_init/page1' next="quiz_init/beginner/which_technologies" />
>>>>>>> c4d8ae0453a9247349e18bb4a735392fc073a2c5
    </div >
  )
}

export default BeginnerMentorTalk;