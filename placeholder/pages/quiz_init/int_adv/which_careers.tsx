import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import Navbar from "../../../components/Navbar";
import { rolesChoices } from '../../../utils/constants'
import SelectDesiredFieldsForm from "../../../components/SelectDesiredFields";
import { useAppSelector } from "../../../redux/hooks";


function WhichCareers() {

  const selectedCareers = useAppSelector((state)=> state.mentorPreferences.desiredCareers);

  return (
    <div className="container">
      <Navbar progressValue={90} prevValue={80} />
      <SelectDesiredFieldsForm choices={rolesChoices} beginner={false}/>
      <QuizNavigationButtons next="quiz_init/create_profile" canProceed={Boolean(selectedCareers.length)} progressValue={90}/>
    </div>
  )
}

export default WhichCareers;