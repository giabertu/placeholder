import MentorTalk from "../../../components/MentorTalk";
import Navbar from "../../../components/Navbar";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import { int_advChoices, int_advDescriptions } from "../../../utils/constants";
import { useAppSelector } from "../../../redux/hooks";


function IntermediateMentorTalk() {

  const desiredMentorCategories = useAppSelector((state) => state.mentorPreferences.desiredCategories)

  return (
    <div className="container flex-column">
      <Navbar progressValue={25}/>
      <MentorTalk choices={int_advChoices} descriptions={int_advDescriptions} />
      <QuizNavigationButtons back='quiz_init/int_adv/Purpose' next="quiz_init/page10" canProceed={Boolean(desiredMentorCategories.length)}/>
    </div >
  )
}

export default IntermediateMentorTalk;