import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import Navbar from "../../../components/Navbar";
import { rolesChoices } from '../../../utils/constants'
import SelectDesiredFieldsForm from "../../../components/SelectDesiredFields";
import { useAppSelector } from "../../../redux/hooks";


function WhichCareers() {

  const selectedCareers = useAppSelector((state)=> state.mentorPreferences.desiredCareers);
  const mentorChoices = useAppSelector((state) => state.mentorPreferences.desiredCategories);
  const route = mentorChoices.includes("expanding my programming skillset") ? "quiz_init/int_adv/which_technologies" : "quiz_init/int_adv/mentor_talk";

  

  return (
    <div className="container">
      <Navbar progressValue={25} />
      <SelectDesiredFieldsForm choices={rolesChoices} beginner={false}/>
      <QuizNavigationButtons back={route} next="quiz_init/create_profile" canProceed={Boolean(selectedCareers.length)}/>
    </div>
  )

}

export default WhichCareers;