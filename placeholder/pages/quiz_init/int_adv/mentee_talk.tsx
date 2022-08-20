import MenteeTalk from "../../../components/MenteeTalk";
import Navbar from "../../../components/Navbar";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import { menteeChoices, menteeDescriptions } from "../../../utils/constants";
import { useAppSelector } from "../../../redux/hooks";


function IntermediateMentorTalk() {

  const desiredMentorCategories = useAppSelector((state) => state.menteePreferences.desiredCategories)

  return (
    <div className="container flex-column">
      <Navbar progressValue={25}/>
      <MenteeTalk choices={menteeChoices} descriptions={menteeDescriptions} />
      <QuizNavigationButtons back='quiz_init/int_adv/purpose' next="quiz_init/page10" canProceed={Boolean(desiredMentorCategories.length)}/>
    </div >
  )

}

export default IntermediateMentorTalk;