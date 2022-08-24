import Navbar from "../../../components/Navbar";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import { rolesChoices } from '../../../utils/constants'
import SelectYourFieldsForm from "../../../components/SelectYourFields";
import { useAppSelector } from "../../../redux/hooks";


function Roles() {

  const selectedRole = useAppSelector((state) => state.userInfo.developerField)

  

  return (
    <div className="container flex-column">
      <Navbar progressValue={20} />
      <SelectYourFieldsForm choices={rolesChoices} />
      <QuizNavigationButtons  next="quiz_init/int_adv/experienced_technologies" canProceed={Boolean(selectedRole)} />
    </div >
  )
}

export default Roles;