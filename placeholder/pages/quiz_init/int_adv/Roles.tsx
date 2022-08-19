import { useColorMode } from "@chakra-ui/react";
import Navbar from "../../../components/Navbar";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import { rolesChoices } from '../../../utils/constants'
import RolesForm from "../../../components/Roles";
import { useAppSelector } from "../../../redux/hooks";


function Roles() {

  const selectedRole = useAppSelector((state) => state.userInfo.developerField)

  const {colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <div className="container flex-column">
    <Navbar progressValue={25}/>
    <RolesForm choices={rolesChoices} />
    <QuizNavigationButtons back='quiz_init/experience_level' next="quiz_init/int_adv/which_technologies" canProceed={Boolean(selectedRole)}/>
  </div >
  )
}

export default Roles;