import MenteeTalk from "../../../components/MenteeTalk";
import Navbar from "../../../components/Navbar";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import { menteeChoices, menteeDescriptions } from "../../../utils/constants";
import { useAppSelector } from "../../../redux/hooks";


function IntermediateMenteeTalk() {

  const desiredMenteeCategories = useAppSelector((state) => state.menteePreferences.desiredCategories)
  const route = desiredMenteeCategories.includes("advance their programming skills") ? 'int_adv/which_taught_technologies' : "create_profile"

  return (
    <div className="container flex-column">
      <Navbar progressValue={50}/>
      <MenteeTalk choices={menteeChoices} descriptions={menteeDescriptions} />
      <QuizNavigationButtons next={`quiz_init/${route}`} canProceed={Boolean(desiredMenteeCategories.length)}/>
      
    </div >
  )

}

export default IntermediateMenteeTalk;