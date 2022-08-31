import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import Navbar from "../../../components/Navbar";
import { rolesChoices } from '../../../utils/constants'
import SelectDesiredFieldsForm from "../../../components/SelectDesiredFields";
import { useAppSelector } from "../../../redux/hooks";


function WhichCareers() {

  const selectedCareers = useAppSelector((state)=> state.mentorPreferences.desiredCareers);
  const mentorChoices = useAppSelector((state) => state.mentorPreferences.desiredCategories);
  const route = mentorChoices.includes("learning how to program") ? "quiz_init/beginner/which_technologies" : "quiz_init/beginner/mentor_talk";



  return (
    <div className="container">
      <Navbar progressValue={75} prevValue={50}/>
      <SelectDesiredFieldsForm choices={rolesChoices} beginner={true}/>
      <QuizNavigationButtons next="quiz_init/create_profile" canProceed={Boolean(selectedCareers.length)} progressValue={75}/>
    </div>
  )

}

export default WhichCareers;